import "./Register.css"

import { useRef, useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom"
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';


//Regex pra testar user name (precisa começar com uma letra e depois ter de 3 a 23 caracteres entre letras, numeros ifen e underline)
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//Regex para testar o pwd, de 8 a 24 letras, numeros e caracteres especias
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const LOGIN_URL = '/login';

//para criar a hash que vai ser armazenada como password
const bcrypt = require('bcryptjs');

const Login = () => {

    //para redirecionar o usuario
    const navigate = useNavigate ();

    //para pegar elementos html
    const userRef = useRef();
    const errRef = useRef();

    //State para controlar User, PWD, e PWD match, Focus é para acessibilidade
     const [user, setUser] = useState('');
     
     const [validName, setValidName] = useState(false);
     const [userFocus, setUserFocus] = useState(false);

     const [pwd, setPwd] = useState('');
     const [validPwd, setValidPwd] = useState(false);
     const [pwdFocus, setPwdFocus] = useState(false);

     const [errMsg, setErrMsg] = useState('');

    //useEffect é usado para rodar uma função, leva 2 argumentos, a função em si (como uma arrow function) e um array de states que ele monitora
    //cada vez que um desses states é alterado, o Effect é acionado. Se o array estiver vazio, ele roda sempre que carregar a página.
     useEffect(() => {
        userRef.current.focus();
     }, []);

    
    //testa o regex cada vez que o user é alterado
     useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
     }, [user]);

    //testa o regex cada vez que o pwd é alterado
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    }, [pwd]);

    //limpa a mensagem de erro
    useEffect(() => {
        setErrMsg('');
     }, [user,pwd]);

    


    const handleSubmit = async (e) => {
        
        e.preventDefault();
    
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
    
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

        
        const hash = bcrypt.hashSync(pwd, 8);

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, hash }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    
                    // alterar aqui para usar cookies e credenciais depois dos testes*/
                    withCredentials: false
                }
            );
            console.log(response?.data);

            //clear state and controlled inputs
            localStorage.setItem('user', JSON.stringify(response.data))
            
            
            //Redireciona o usuario apos o login
            navigate('/orcamento');
           
        } catch (err) {
        
            if (!err?.response) {
                setErrMsg('No Server Response');
                
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    return (
        <>{
            
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input className="registerInput"
                    type="text"
                    id="username"
                    /*Não sei pra que serve userRef*/
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    /*Se o user name for invalido, o screen reader vai ler o campo de informação uidnote*/
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    />

                {/* Se estiver em foco, se o user name começou a ser digitado e se for invalido, exibe a informação, senao tira ela da tela.     */}
                <p id="uidnote" className={userFocus && user && !validName ? "instruction" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br/>
                    Must begin with a letter.<br/>
                    Letters, numbers, underscore, hyphens allowed.
                </p>

                {/*Campo de password*/}
                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    className="registerInput"
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    /*Se o pwd for invalido, o screen reader vai ler o campo de informação uidnote*/
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    />

                {/* Se estiver em foco, se o user name começou a ser digitado e se for invalido, exibe a informação, senao tira ela da tela.     */}
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instruction" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br/>
                    Must include Uppercase and lowercase letters, a number and a special character<br/>
                    Alowed special characters: <span aria-label="exclamation mark">!</span>
                                                <span aria-label="at symbol">@</span>.
                                                <span aria-label="hashtag">#</span>
                                                <span aria-label="dollar sign">$</span>
                                                <span aria-label="percent">%</span>
                
                </p>

 

                <button disabled={!validName || !validPwd ? true : false}>Log In</button>
            </form>

            <p>
                Don't have an account?<br />
                {/*put router link here*/}
                <a href="/register">Register</a>
            
            </p>
            
        </section>
        }
        </>
    ); 
}
 
export default Login;