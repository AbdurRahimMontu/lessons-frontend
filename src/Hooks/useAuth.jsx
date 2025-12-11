// import { useContext, useEffect } from "react";
// import AuthContext from "../Provider/AuthContext";
// import axios from "axios";

// const useAuth = () => {
//   const { user, setUser, loading, setLoading, logOut } = useContext(AuthContext);


//   useEffect(() => {
//     if (!user?.email) return;

//     const syncPremium = async () => {
//       try {
//         const res = await axios.get(`/user/role/${user.email}`);
//         setUser((prev) => ({
//           ...prev,
//           isPremium: res.data?.isPremium || false,
//         }));
//       } catch (error) {
//         console.log("Premium Sync Error:", error);
//       }
//     };

//     syncPremium();
//   }, [user?.email, setUser]);

//   return { user, setUser, loading, setLoading, logOut };
// };

// export default useAuth;


import React, { use } from 'react';
import AuthContext from './../Provider/AuthContext';

const useAuth = () => {
  const auth = use(AuthContext)
  return auth

};

export default useAuth;