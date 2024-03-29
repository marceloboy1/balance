import "./Register.css"

import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios';


//Regex pra testar user name (precisa começar com uma letra e depois ter de 3 a 23 caracteres entre letras, numeros ifen e underline)
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
//Regex para testar o pwd, de 8 a 24 letras, numeros e caracteres especias
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {

    //não sei pra que serve isso
    const userRef = useRef();
    const errRef = useRef();

    //State para controlar User, PWD, e PWD match, Focus é para acessibilidade
     const [user, setUser] = useState('');
     const [validName, setValidName] = useState(false);
     const [userFocus, setUserFocus] = useState(false);

     const [pwd, setPwd] = useState('');
     const [validPwd, setValidPwd] = useState(false);
     const [pwdFocus, setPwdFocus] = useState(false);

     const [matchPwd, setMatchPwd] = useState('');
     const [validMatch, setValidMatch] = useState(false);
     const [matchFocus, setMatchFocus] = useState(false);

     const [errMsg, setErrMsg] = useState('');
     const [success, setSuccess] = useState(false);

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
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    //limpa a mensagem de erro
    useEffect(() => {
        setErrMsg('');
     }, [user,pwd,matchPwd]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
    
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
    
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    
                    // alterar aqui para usar cookies e credenciais depois dos testes*/
                    withCredentials: false
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);

            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
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
            success ? (
                <section>
                    <h1>User registred!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
        
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
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

               {/*Campo de confirmação de password*/}
               <label htmlFor="confirm_pwd">
                    Confirm password:
                    <span className={validMatch && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    className="registerInput"
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    /*Se o pwd for invalido, o screen reader vai ler o campo de informação uidnote*/
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    />

                {/* Se estiver em foco, se o user name começou a ser digitado e se for invalido, exibe a informação, senao tira ela da tela.     */}
                <p id="confirmnote" className={matchFocus && !validMatch ? "instruction" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password field.
                </p>

                <button disabled={!validName || !validMatch || !validPwd ? true : false}>Sign Up</button>
            </form>

            <p>
                Already registered?<br />
                {/*put router link here*/}
                <a href="#">Sign In</a>
            
            </p>
            
        </section>
        )}
        </>
    ); 
}
 
export default Register;