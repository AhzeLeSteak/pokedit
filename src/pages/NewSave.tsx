import {SaveFile, Version} from "../firebase/types";
import React, {useState} from "react";
import {addDoc, collection, CollectionReference} from "firebase/firestore";
import {COLLECTIONS, getFirestore} from "../firebase/firebase-config";
import {useAuthContext} from "../firebase/AuthProvider";
import {useNavigate} from "react-router-dom";

const VERSIONS: Version[] = ['red', 'blue', 'yellow'];

export const NewSave = () => {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [file, _setFile] = useState<File>()
    const [saveName, setSaveName] = useState('');
    const [version, setVersion] = useState(VERSIONS[0]);

    const setFile = (f: File) => {
        _setFile(f);
        if(saveName === '') setSaveName(`Pokémon ${version} save`);
    }

    const GO = async() => {
        const save_collection = collection(getFirestore(), COLLECTIONS.SAVE_FILES) as unknown as CollectionReference<SaveFile>;
        const doc_ref = await addDoc<SaveFile>(save_collection, {
            uid: user!.uid,
            version: version,
            file: Array.from(new Uint8Array(await file!.arrayBuffer())),
            name: saveName
        });
        navigate('/save/'+doc_ref.id);
    }

    return <div id="dialog-new-file" className="grid">
        <div className="col-6">
            Choose a file
        </div>
        <div className="col-6 grid">
            <input type="file" className="col-4" onChange={ev => ev.target.files && setFile(ev.target.files[0])} />
            <small className="col">{file && file.name}</small>
        </div>
        <div className="col-6">
            Select the corresponding game
        </div>
        <div className="col-6">
            <select value={version} onChange={e => setVersion(e.target.value as Version)}>
                {VERSIONS.map(v =>
                    <option value={v}>{v}</option>
                )}
            </select>
        </div>
        <div className="col-6">
            Name your save
        </div>
        <div className="col-6">
            <input type="text" value={saveName} onChange={e => setSaveName(e.target.value)}/>
        </div>
        <div className="col-offset-6 col-6">
            <button onClick={GO} disabled={!file || !version}>OK</button>
        </div>
    </div>
}
