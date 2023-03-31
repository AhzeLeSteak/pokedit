import {SaveFile} from "../firebase/types";
import {collection, CollectionReference, deleteDoc, DocumentReference, query, where} from "firebase/firestore";
import {COLLECTIONS, getFirestore} from "../firebase/firebase-config";
import {useCollection} from "react-firebase-hooks/firestore";
import {useAuthContext} from "../firebase/AuthProvider";
import {Button} from "primereact/button";
import React from "react";
import {useNavigate} from "react-router-dom";
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup";
import {SaveImg} from "./SaveImg";

export const SavesList = () => {
    const navigate = useNavigate()
    const {user} = useAuthContext();

    const save_collection = collection(getFirestore(), COLLECTIONS.SAVE_FILES) as unknown as CollectionReference<SaveFile>;
    const q = query(save_collection, where('uid', '==', user?.uid))
    let [saves, loading, error] = useCollection(q);

    if(!saves)
        return <></>

    const deleteSave = async(ev: {currentTarget: EventTarget & HTMLElement}, doc: DocumentReference<SaveFile>) =>
        confirmPopup({
            target: ev.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => deleteDoc(doc),
        });

    return <>
        <ConfirmPopup />
        {saves.docs.map(d => {
            const save = d.data();
            return <div className="grid" key={d.id}>
                <div className="col-2 md:col-3 flex align-items-center">
                    <SaveImg version={save.version}/>
                </div>
                <div className="col poke-font flex align-items-center">
                    {save.name}
                </div>
                <div className="col-2 md:col-3 flex flex-column md:flex-row align-items-end gap-2">
                    <Button icon="pi pi-eye"
                            className="h-1rem md:h-auto"
                            aria-label="View save"
                            onClick={() => navigate('/save/' + d.id)}
                    />
                    <Button icon="pi pi-times"
                            aria-label="Delete"
                            className="h-1rem md:h-auto"
                            severity="danger"
                            onClick={e => deleteSave(e, d.ref)}
                    />
                </div>
            </div>;
        })}
    </>
}

