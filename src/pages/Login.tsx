import './Login.scss'
import {useAuthContext} from "../firebase/AuthProvider";
import {Gen1SaveReader} from "../data/Gen1/Gen1SaveReader";
import React, {DragEventHandler, useState} from "react";
import {SaveReader} from "../data/SaveReader";
import {SaveViewer} from "./SaveViewer";

export const Login = () => {

    const {login} = useAuthContext();
    const [saveReader, setSaveReader] = useState<SaveReader>();

    if(saveReader)
        return <SaveViewer saveReader={saveReader} onHome={() => setSaveReader(undefined)}></SaveViewer>

    const handleFileData = async(file: Blob) => {
        const buffer = await file.arrayBuffer()
        const uint8Array = new Uint8Array(buffer);
        setSaveReader(new Gen1SaveReader(uint8Array));
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
