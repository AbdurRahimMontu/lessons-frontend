import {createBrowserRouter} from 'react-router'
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';

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

    }
])

export default Routes;