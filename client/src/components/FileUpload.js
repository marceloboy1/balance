//import "./FileUpload.css"

import { FileUploadOutlined } from "@mui/icons-material";
import React, {ChangeEvent, useState} from "react";
import axios from "./api/axios";

function FileUpload(){


const [file, setFile] = useState();

const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files){
        setFile(e.target.files[0])
        console.log("Arquivo anexado")
    }
};

const handleUploadClick = () => {
    if (!file) {
        return;
    }
    const newFormData = new FormData();
    newFormData.append("userGastos", file, "userGastos.xlsx")
    const response = axios.post("/uploadFile", newFormData, 
    
            {
                headers: { 
                'Content-Type': 'multipart/form-data' },
                // alterar aqui para usar cookies e credenciais depois dos testes*/
                withCredentials: false
            }
            );
            console.log(file)            
        }


return(
    <div>
        <p>Faça o upload da sua tabela de gastos seguindo a nossa <a href="gastos.xlsx" download="gastos.xlsx">tabela guia</a></p>
        <div>
            <br></br>
            <form>
                <input type="file" name="userGastos" accept="application/xlsx" onChange={handleFileChange}/>
                <FileUploadOutlined onClick={handleUploadClick}></FileUploadOutlined>
            </form>
        </div>
    </div>
)}

export default FileUpload;
