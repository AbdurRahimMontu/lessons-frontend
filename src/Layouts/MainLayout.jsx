import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import Container from '../Components/Container';

const MainLayout = () => {
    return (
        <div>
       
            <Navbar></Navbar>
            <Container>
            <Outlet></Outlet>
            </Container>
            <Footer></Footer>
        
        </div>
    );
};

export default MainLayout;