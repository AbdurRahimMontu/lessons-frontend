import React from 'react';
import useRole from '../../Hooks/useRole';
import AdminStatistics from './AdminStatistics';
import CustomerStatistics from './CustomerStatistics';

const Statistics = () => {
    const [role, isRoleLoading] =useRole()
    console.log(role);

    if(isRoleLoading){
        return <p>Loading....</p>
    }

    return (
        <div>
 { role === 'admin'? (<AdminStatistics></AdminStatistics>) :
 (<CustomerStatistics></CustomerStatistics>)}

    
        </div>
    );
};

export default Statistics;