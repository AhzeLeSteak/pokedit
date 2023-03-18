import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {COLLECTIONS, getAuth, getFirestore, loginWithGoogle, logoutWithGoogle} from "./firebase-config";
import {User as GoogleUser} from 'firebase/auth'
import {collection, doc, DocumentReference, getDoc, getDocs, query, Query, setDoc, where} from "firebase/firestore";

export interface User{
    name: string,
    photoUrl: string,
    uid: string,
    inGroup: boolean
}

export type AuthContextType = {
    user ?: GoogleUser,
    login: () => void,
    logout: () => void,
    getUserRef: () => Promise<DocumentReference<User>> | null
}
const AuthContext = createContext<AuthContextType>({
    login: () => null,
    logout: () => null,
    getUserRef: () => null
});

export const useAuthContext = () => useContext(AuthContext);

function AuthProvider(props: any){

    const auth = getAuth();

    const [user, setUser] = useState<GoogleUser | undefined>();
    const [loading, setLoading] = useState(true);


    useEffect(
        () => {
        auth.onAuthStateChanged(async (newUser: GoogleUser | null) => {
            setUser(newUser ?? undefined);
            setLoading(false);
            if (newUser)
                return register(newUser);
        })
    }, [auth]);

    const login = () => loginWithGoogle()
        .then(({user}) => {
                setUser(user);
            })

    const logout = () => logoutWithGoogle()



    const getUserRef = useMemo(() => {
        if(!user)
            return () => null;
        const query_user = query(collection(getFirestore(), COLLECTIONS.USERS), where('uid', '==', user?.uid)) as Query<User>;
        return () => getDocs(query_user).then(res => res.docs[0].ref);
    }, [user]);


    return <AuthContext.Provider value={{user, login, logout, getUserRef}}>
        {!loading && props.children}
    </AuthContext.Provider>
}

/**
 * Enregistre l'utilisateur dans la collection 'users' s'il n'y est pas déjà
 * @param user
 */
async function register(user: GoogleUser) {
    const newDoc = doc(getFirestore(), COLLECTIONS.USERS + user.uid);
    if (!(await getDoc(newDoc)).exists()){
        return setDoc(newDoc, {
            uid: user.uid,
            name: user.displayName,
            photoUrl: user.photoURL,
            inGroup: false
        })
    }
}

export default AuthProvider;
