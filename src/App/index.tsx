import { useState, useEffect } from 'react';
import { useRoutes } from 'hookrouter';
import { appRoutes } from './router';
import React, { createContext } from 'react';
import { NotFoundPage } from '../shared/NotFoundPage';

import firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from '../../firebase/firebaseConfig';

const onAuthStateChange = (callback: Function) => {
    return firebase.auth().onAuthStateChanged((user: any) => {
        console.log('STATE CHANGED');
        if (user) {
            callback({ loggedIn: true, email: user.email });
        } else {
            callback({ loggedIn: false });
        }
    });
};

firebase.initializeApp(firebaseConfig);

const defaultUser = { loggedIn: false, email: '' };
export const UserContext = createContext(defaultUser);
const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

export const App = () => {
    const [user, setUser] = useState({ loggedIn: false, email: '' });

    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        () => unsubscribe();
        console.log(user);
    }, []);

    const routeResult = useRoutes(appRoutes);
    return (
        <>
            <UserProvider value={user}>{routeResult || <NotFoundPage />}</UserProvider>
        </>
    );
};

export default App;
