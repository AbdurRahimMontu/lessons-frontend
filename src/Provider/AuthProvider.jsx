import React, { useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null)

   const createNewUser =(email,password)=>{
    return createUserWithEmailAndPassword(auth,email,password)
   }



    const authInfo = {
      createNewUser,
      user,
      setUser,
      
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;