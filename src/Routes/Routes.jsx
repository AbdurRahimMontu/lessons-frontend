import {createBrowserRouter} from 'react-router'
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Signup from './../Auth/Signup';
import Login from './../Auth/Login';

const Routes = createBrowserRouter([
    {
       path:"/",
       Component:MainLayout,
       children:[
        {
            index:true,
            Component:Home
        },{
            
        }
       ]

    },
    {
        path:"/signUp",
        Component:Signup
    },
    {
        path:"/login",
        Component:Login
    }
])

export default Routes;