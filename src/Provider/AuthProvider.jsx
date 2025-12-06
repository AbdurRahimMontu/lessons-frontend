import React from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({children}) => {

    const authInfo = {
        name: "Abdur Rahim",
        age:34
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;