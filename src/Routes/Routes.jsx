import {createBrowserRouter} from 'react-router'
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Signup from './../Auth/Signup';
import Login from './../Auth/Login';
import DashboardLayout from '../Layouts/DashboardLayout';
import Dashboard from '../Pages/Dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import AddLesson from '../Pages/AddLesson';
import MyLessons from './../Pages/MyLessons';
import MyFavorites from '../Pages/Dashboard/MyFavorites';
import PublicLessons from '../Pages/PublicLessons';
import LessonDetails from './../Pages/LessonDetails';
import PricingPage from './../Pages/PricingPage';


const Routes = createBrowserRouter([
    {
       path:"/",
       Component:MainLayout,
       children:[
        {
            index:true,
            Component:Home
        },{
            path:"/publicLessons",
            Component:PublicLessons,
        },{
           path: "/lessonsDetails/:id",
            Component:LessonDetails,
        },{
           path: "/pricing",
            Component:PricingPage,
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
    },
    {
        path:"/dashboard",
        Component:DashboardLayout,
        children:[
            {
             index:true,
             Component:Dashboard
            },
         {
  path: "/dashboard/add-lesson",
  element: (
    <PrivateRoute>
    <AddLesson></AddLesson>
    </PrivateRoute>
  ),
},
         {
  path: "/dashboard/my-lessons",
  element: (
    <PrivateRoute>
    <MyLessons></MyLessons>
    </PrivateRoute>
  ),
}
,
         {
  path: "/dashboard/my-favorites",
  element: (
    <PrivateRoute>
    <MyFavorites></MyFavorites>
    </PrivateRoute>
  ),
}

        ]
    }
])

export default Routes;