import './Login.scss'
import {useAuthContext} from "../firebase/AuthProvider";
import React, {DragEventHandler, useEffect, useState} from "react";
import {SaveReader} from "../data/SaveReader";
import {SaveViewer} from "./SaveViewer";
import {GENERATIONS, Language, Version} from "../firebase/types";
import {get_reader} from "../data/get_save_reader";
import {VersionLanguagePicker} from "../components/VersionLanguagePicker";
import {Gen2SaveReader} from "../data/Gen2/Gen2SaveReader";

export const Login = () => {

    const {login} = useAuthContext();
    const [saveReader, setSaveReader] = useState<SaveReader>();
    const [version, setVersion] = useState<Version>(GENERATIONS[0].versions[0].value);
    const [language, setLanguage] = useState<Language>('EN');

    useEffect(() => {
        (async() => {
            const q = await fetch('pokedit/save/gold.sav');
            const save = await q.arrayBuffer()
            const sr = new Gen2SaveReader(new Uint8Array(save), 'FR', 'gold');
            setSaveReader(sr);
            console.log(sr.save);
        })();
    }, []);

    if(saveReader)
        return <SaveViewer saveReader={saveReader} edit={false} onHome={() => setSaveReader(undefined)}></SaveViewer>

    const handleFileData = async(file: Blob) => {
        const buffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(buffer);
        setSaveReader(get_reader(version, language, uint8Array));
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
        <div id="drop-zone">
            <p className="col-12 p-3"
               onClick={handleClick}
               onDrop={handleDropFile}
               onDragOver={ev => ev.preventDefault()}
            >
                Drop your save file here to visualize it
            </p>
            <div className="grid col-12">
                <VersionLanguagePicker value={{language, version}}
                                       onChange={(v, l) => {setLanguage(l);setVersion(v)}}
                />
            </div>
        </div>
        <div id="login" onClick={login}>
            Or connect with <i className="pi pi-google ml-2 mr-2"/> to save your files
        </div>
    </div>
}
