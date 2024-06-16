import React from 'react';
import UserCard from './UserCard';

function UserList({ users }) {
    return (
        <div className='w-full'>
            {users.map((user, index) => (
                <UserCard key={index} user={user} />
            ))}
        </div>
    );
}

export default UserList;
