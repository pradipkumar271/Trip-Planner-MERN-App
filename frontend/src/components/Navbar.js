import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Trip Planner
                </Typography>

                {user && (
                    <>
                        <Button color="inherit" href="/discover">
                            Discover
                        </Button>
                        <Button color="inherit" href="/dashboard">
                            My Trips
                        </Button>
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;