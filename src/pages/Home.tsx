import './Home.scss'
import React from "react";
import {useAuthContext} from "../firebase/AuthProvider";
import {Tooltip} from "primereact/tooltip";
import {useNavigate} from "react-router-dom";
import {Button} from "primereact/button";
import {SavesList} from "../components/SavesList";


export const Home = () => {
    const {user, logout} = useAuthContext();
    const navigate = useNavigate();


    return <div id="home">
        <div className="user-row grid pl-4 pr-4">
            <div className="col-4 grid gap-2">
                <Tooltip target="#userPP"/>
                <img referrerPolicy="no-referrer"
                     src={user?.photoURL!}
                     className="action-btn"
                     id="userPP"
                     data-pr-tooltip={'Connecté en tant que '+user?.displayName}
                     alt="userPP"/>
                <button id="btn-logout" onClick={logout}>
                    <i className="pi pi-power-off"></i>
                </button>
            </div>
            <Button id="btn-dialog"
                    onClick={() => navigate('/new')}
                    label="Import a new save file"
                    severity="secondary"
                    className="col"
            />
        </div>

        <div className="mt-6">
           <SavesList/>
        </div>
    </div>
}
