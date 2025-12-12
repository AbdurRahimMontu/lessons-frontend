import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Signup from "./../Auth/Signup";
import Login from "./../Auth/Login";
// import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddLesson from "../Pages/AddLesson";
import MyLessons from "./../Pages/MyLessons";
import MyFavorites from "../Pages/Dashboard/MyFavorites";
import PublicLessons from "../Pages/PublicLessons";
import LessonDetails from "./../Pages/LessonDetails";
import PricingPage from "./../Pages/PricingPage";
// import Profile from "../Pages/UserProfile";
import Statistics from "../Components/Statistics/Statistics";
import AuthorProfile from "../Components/AuthorProfile";
import TermsCondition from "../Components/TermsCondition";
import ErrorPage from "../Pages/ErrorPage";
import AdminProfile from "../Pages/Dashboard/AdminProfile";
import UpdateLesson from "../Pages/UpdateLesson";
import PaymentSuccess from "../Components/PaymentSuccess";
import PaymentCancel from "../Components/PaymentCancel";




const Routes = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/publicLessons",
        Component: PublicLessons,
      },

      {
        path: "/lessonsDetails/:id",
        Component: LessonDetails,
      },
      {
        path: "/pricing",
        Component: PricingPage,
      },
      {
        path: "/authorLessons",
        Component: AuthorProfile,
      },
      {
    path: "/signUp",
    Component: Signup,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/payment-success",
    Component: PaymentSuccess,
  },
  {
    path: "/payment/cancel",
    Component: PaymentCancel,
  },
  {
    path: "/terms",
    element:<TermsCondition></TermsCondition>,
  },
    ],
  },
  
  // {
  //   path: "/dashboard",
  //   Component: DashboardLayout,
  //   children: [

  //     {
  //       index: true,
  //       Component: Dashboard,
  //     },


  //     {
  //       path: "/dashboard/add-lesson",
  //       element: (
  //         <PrivateRoute>
  //           <AddLesson></AddLesson>
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/statistics",
  //       element: (
  //         <PrivateRoute>
  //         <Statistics></Statistics>
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/my-lessons",
  //       element: (
  //         <PrivateRoute>
  //           <MyLessons></MyLessons>
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/my-favorites",
  //       element: (
  //         <PrivateRoute>
  //           <MyFavorites></MyFavorites>
  //         </PrivateRoute>
  //       ),
  //     },
  //     {
  //       path: "/dashboard/profile",
  //       element: (
  //         <PrivateRoute>
  //           <Profile></Profile>
  //         </PrivateRoute>
  //       ),
  //     },

      
  //   ],
  // },

 
 {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Statistics /> },
      { path: "add-lesson", element: <PrivateRoute><AddLesson /></PrivateRoute> },
      { path: "my-lessons", element: <PrivateRoute> <MyLessons /></PrivateRoute> },
      {
      path: "my-lessons/update/:id",   
       element: <UpdateLesson />
    },
      { path: "my-favorites", element: <PrivateRoute><MyFavorites /></PrivateRoute> },
      // { path: "user/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
      {
         path:"profile",
         element:<PrivateRoute><AdminProfile></AdminProfile></PrivateRoute>
      },
      // {
      //    path:"profile",
      //    element:<PrivateRoute><AdminProfile></AdminProfile></PrivateRoute>
      // },
      
    ],
  },{
    path:"*",
    element:<ErrorPage></ErrorPage>
  }


]);

export default Routes;
