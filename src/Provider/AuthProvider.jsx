import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';

const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(true)

   const createNewUser =(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
   }

   const googleSignIn =()=>{
    return signInWithPopup(auth, googleProvider)
   }


   const signInUser =(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
   }
   
   

   const logOut =()=>{
    setLoading(true)
    return signOut(auth)
   }
   const updateUserProfile =(profile)=>{
    return updateProfile(auth.currentUser, profile)
   }
 
   useEffect(()=>{
    const unSubscribe= onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        setLoading(false)
        console.log(currentUser);
    });
    return () => {
        unSubscribe();
    }
   },[])


    const authInfo = {
      createNewUser,
      signInUser,
      user,
      setUser,
      logOut,
      loading,
      updateUserProfile,
      googleSignIn,

    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;