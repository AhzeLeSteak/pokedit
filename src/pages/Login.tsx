import './Login.scss'
import {useAuthContext} from "../firebase/AuthProvider";
import {Gen1SaveDataReader} from "../data/Gen1/Gen1SaveDataReader";
import React, {DragEventHandler, useState} from "react";
import {SaveDataType} from "../data/AbstractSaveDataReader";
import {SaveViewer} from "./SaveViewer";

export const Login = () => {

    const {login} = useAuthContext();
    const [saveData, setSaveData] = useState<SaveDataType>();

    if(saveData)
        return <SaveViewer saveData={saveData} onHome={() => setSaveData(undefined)}></SaveViewer>

    const handleFileData = async(file: Blob) => {
        const buffer = await file.arrayBuffer()
        const uint8Array = new Uint8Array(buffer);
        const save_data = new Gen1SaveDataReader(uint8Array).get_save_data();
        setSaveData(save_data);
    };

    const handleDropFile: DragEventHandler = (event) => {
        event.preventDefault();
        return handleFileData(event.dataTransfer.files[0]);
    };

    const handleClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.sav';
        input.onchange = () => input.files && input.files.length && handleFileData(input.files[0]);
        input.click();
    };

    return <div id="login-page" className="poke-font">
        <div id="drop-zone" onClick={handleClick} onDrop={handleDropFile} onDragOver={ev => ev.preventDefault()}>
            Drop your save file here to visualize it
        </div>
        <div id="login" onClick={login}>
            Or connect with <i className="pi pi-google ml-2 mr-2"/> to save your files
        </div>
    </div>
}
