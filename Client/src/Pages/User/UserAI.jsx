import React from 'react';
import Header from '../../Components/UserDashboardParts/Header';
import UserSidebar from '../../Components/UserDashboardParts/UserSidebar';
import UserAiBot from '../../Components/UserDashboardParts/UserAiBot';
const UserAI = () => {

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex flex-grow">
                <UserSidebar />
                <main className="flex-1 flex flex-col justify-center items-center p-6">
                    <UserAiBot />
                </main>
            </div>
        </div>
    );
};

export default UserAI;