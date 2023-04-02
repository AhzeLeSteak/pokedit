import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SaveReader} from "../data/SaveReader";
import {SaveViewer} from "./SaveViewer";
import {collection, CollectionReference, doc, getDoc} from "firebase/firestore";
import {COLLECTIONS, getFirestore} from "../firebase/firebase-config";
import {SaveFile} from "../firebase/types";
import {useAuthContext} from "../firebase/AuthProvider";
import {get_reader} from "../data/get_save_reader";


export const CloudSaveViewer = () => {
    const {id} = useParams();

    return id ? <SubViewer id={id}/> : <Navigate to={'/'}/>

}


const SubViewer = ({id}: {id: string}) => {
    const navigate = useNavigate();
    const {user} = useAuthContext();

    const [saveReader, setSaveReader] = useState<SaveReader>();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        (async() => {
            const save_collection = collection(getFirestore(), COLLECTIONS.SAVE_FILES) as unknown as CollectionReference<SaveFile>;
            const save_doc = await getDoc<SaveFile>(doc(save_collection, id));
            const save = save_doc.data();
            if(!save) return;
            setEdit(save.uid === user?.uid);
            setSaveReader(get_reader(save.version, save.language, new Uint8Array(save.file)));
        })();
    }, [id, user?.uid]);

    return saveReader ? <SaveViewer edit={edit} saveReader={saveReader} onHome={() => navigate('/')}/> : <div className="poke-font">Loading</div>;
}
