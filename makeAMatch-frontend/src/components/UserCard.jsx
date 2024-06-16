import React from 'react';
import {Card,CardContent,Typography} from '@mui/material';

function UserCard({ user }) {
    return (
        <Card className='my-2'>
            <CardContent>
                <Typography variant="h6" component="div">
                    {user.firstName} {user.lastName}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    Email: {user.email}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    Role: {user.role}
                </Typography>
                <Typography color="text.secondary">
                    Address: {user.address}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default UserCard;
