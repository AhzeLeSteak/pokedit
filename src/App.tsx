import './App.scss';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'

import React, {useLayoutEffect, useState} from 'react';
import {Home} from "./pages/Home";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {useAuthContext} from "./firebase/AuthProvider";
import {Login} from "./pages/Login";
import {CloudSaveViewer} from "./pages/CloudSaveViewer";
import {NewSave} from "./pages/NewSave";


const APP_WIDTH = 307;
const APP_HEIGHT = 160;
const ASPECT_RATIO = APP_WIDTH / APP_HEIGHT;


function App() {

    const [aspectRatio, setAspectRatio] = useState(1);
    const {user} = useAuthContext();

    useLayoutEffect(() => {
        function updateSize() {
            setAspectRatio(window.innerWidth / window.innerHeight);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return (
        <div className={'App ' + (aspectRatio > ASPECT_RATIO ? 'horizontal' : 'vertical')} style={{'--aspect-ratio': ASPECT_RATIO} as React.CSSProperties}>
            <HashRouter>
                <Routes>
                    <Route path="/save/:id" element={<CloudSaveViewer />}/>
                    <Route path="/new" element={<NewSave/>}/>
                    <Route path={'/'} element={<div id="home-page">
                        {user ? <Home/> : <Login/>}
                    </div>}/>
                    <Route path={'/*'} element={<Navigate to={'/'}/>}/>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
