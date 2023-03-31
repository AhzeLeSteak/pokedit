import './NewSave.scss';
import {Language, LANGUAGES, SaveFile, Version, VERSIONS} from "../firebase/types";
import React, {useState} from "react";
import {addDoc, collection, CollectionReference} from "firebase/firestore";
import {COLLECTIONS, getFirestore} from "../firebase/firebase-config";
import {useAuthContext} from "../firebase/AuthProvider";
import {useNavigate} from "react-router-dom";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {FileUpload} from "primereact/fileupload";
import {SaveImg} from "../components/SaveImg";

const title = (str: string) => str[0].toUpperCase() + str.slice(1)

export const NewSave = () => {
    const {user} = useAuthContext();
    const navigate = useNavigate();

    const [file, setFile] = useState<File>()
    let [saveName, setSaveName] = useState('');
    const [version, setVersion] = useState<Version>();
    const [language, setLanguage] = useState<Language>();
    const [hasUserPressed, setHasUserPressed] = useState(false);

    if(file && version && !hasUserPressed)
        saveName = `Pokémon ${title(version)} Version Save`;

    const save_and_navigate = async() => {
        if(!file || !version || !language) return;
        const save_collection = collection(getFirestore(), COLLECTIONS.SAVE_FILES) as CollectionReference<SaveFile>;
        const doc_ref = await addDoc<SaveFile>(save_collection, {
            uid: user!.uid,
            version,
            language: language as Language,
            file: Array.from(new Uint8Array(await file.arrayBuffer())),
            name: saveName,
            file_name: file.name
        });
        navigate('/save/'+doc_ref.id);
    }

    const versionTemplate = (option: {value: Version, label: string}) => {
        return (
            <div className="flex align-items-end">
                <SaveImg version={option.value} width="4em"/>
                <div className="text-lg">{option.label}</div>
            </div>
        );
    };

    return <div id="dialog-new-file" className="grid poke-font">
        <div className="col-6">
            Game version
        </div>
        <div className="col-6">
            <Dropdown value={version}
                      onChange={e => setVersion(e.value)}
                      options={VERSIONS}
                      optionValue="value"
                      optionLabel="label"
                      style={{width: '100%'}}
                      itemTemplate={versionTemplate}
            />
        </div>
        <div className="col-6">
            Game language
        </div>
        <div className="col-6">
            <Dropdown value={language}
                      onChange={e => setLanguage(e.value)}
                      options={LANGUAGES}
                      optionValue="value"
                      optionLabel="label"
                      style={{width: '100%'}}
            />
        </div>
        <div className="col-6">
            Select your save file
        </div>
        <div className="col-6">
            <FileUpload mode="basic"
                        style={{width: '100%'}}
                        onSelect={e => e.files && e.files.length && setFile(e.files[0])}
                        accept=".sav"
            />
        </div>
        <div className="col-6">
            Name your save
        </div>
        <div className="col-6">
            <InputText style={{width: '100%'}} value={saveName} onChange={e => {
                setSaveName(e.target.value)
                setHasUserPressed(true);
            }}/>
        </div>
        <div className="col-offset-6 col-6 flex justify-content-end gap-2">
            <Button onClick={() => navigate('/')} severity="warning">Cancel</Button>
            <Button onClick={save_and_navigate} disabled={!(file && version && saveName)}>Let's go !</Button>
        </div>
    </div>
}
