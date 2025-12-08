import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
<h2 className='text-7xl font-bold text-center  '>
    Page Not Found 404
</h2>
<div className=' pt-10'>
    <Link to="/" className='btn btn-outline'>Back Home</Link>
</div>
        </div>
    );
};

export default ErrorPage;