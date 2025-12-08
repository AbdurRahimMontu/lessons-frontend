import React from 'react';
import useRole from '../../Hooks/useRole';
import AdminStatistics from './AdminStatistics';
import AddLesson from '../../Pages/AddLesson';
import CustomerStatistics from './CustomerStatistics';

const Statistics = () => {
    const [role, isRoleLoading] =useRole()
    console.log(role);

    if(isRoleLoading){
        return <p>Loading....</p>
    }

    return (
        <div>
 { role === 'admin' && (<AdminStatistics></AdminStatistics>)}
 { role === 'customer' && (<CustomerStatistics></CustomerStatistics>)}
    
        </div>
    );
};

export default Statistics;