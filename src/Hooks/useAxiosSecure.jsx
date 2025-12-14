
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import useAuth from "./useAuth";


const instance = axios.create({
      baseURL : 'http://localhost:5000'
})

const useAxiosSecure =()=>{
    const {user, logOut} = useAuth();
    const navigate = useNavigate()

    useEffect(()=>{
        // req interceptor 
const requestInterceptor =  instance.interceptors.request.use((config)=>{
        
        const token = user.accessToken;
    
         if(token){
             config.headers.authorization = `Bearer ${token}`
         }
         return config;
     })

 // res interceptor 
const responseInterceptor = instance.interceptors.request.use(res=>{
    return res;
}, err=>{
    console.log(err);
    const status = err.status;
    if(status === 401 || status === 403){
        console.log("log Out the user for bad request");
          logOut()
          .then(()=>{
            //navigate user o the login page
            navigate("/login")
          })
    }

})


     return ()=>{
        instance.interceptors.request.eject(requestInterceptor)
        instance.interceptors.response.eject(responseInterceptor)
     }

    },[user, logOut, navigate])
 
      return instance;
}

export default useAxiosSecure;
