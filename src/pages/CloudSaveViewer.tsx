import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {SaveDataType} from "../data/AbstractSaveDataReader";
import {SaveViewer} from "./SaveViewer";
import {collection, CollectionReference, doc, getDoc} from "firebase/firestore";
import {COLLECTIONS, getFirestore} from "../firebase/firebase-config";
import {SaveFile} from "../firebase/types";
import {Gen1SaveDataReader} from "../data/Gen1/Gen1SaveDataReader";


export const CloudSaveViewer = () => {
    const {id} = useParams();

    return id ? <SubViewer id={id}/> : <Navigate to={'/'}/>

}


const SubViewer = ({id}: {id: string}) => {
    const navigate = useNavigate();
    const [saveData, setSaveData] = useState<SaveDataType>();

    useEffect(() => {
        (async() => {
            const save_collection = collection(getFirestore(), COLLECTIONS.SAVE_FILES) as unknown as CollectionReference<SaveFile>;
            const save_doc = await getDoc<SaveFile>(doc(save_collection, id));
            const save = save_doc.data();
            if(!save) return;
            const save_data = new Gen1SaveDataReader(new Uint8Array(save.file)).get_save_data();
            setSaveData(save_data);
        })();
    }, [id]);

    return saveData ? <SaveViewer saveData={saveData} onHome={() => navigate('/')}/> : <div className="poke-font">Loading</div>;
}
