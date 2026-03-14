import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome Back
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Sign in to your trip planner account
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        sx={{ mb: 3 }}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mb: 2 }}>
                        Sign In
                    </Button>
                    <Typography>
                        Don't have an account? <Link component={RouterLink} to="/register">Sign up</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
