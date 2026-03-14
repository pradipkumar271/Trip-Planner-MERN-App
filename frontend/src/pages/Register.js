import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { register } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // optional: prevent double click
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        console.log("Signup button clicked");

        try {
            await register(formData.email, formData.password, formData.name);
            alert("Registration successful!");
            navigate('/dashboard');
        } catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            setErrorMsg(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Create Account
                </Typography>

                {errorMsg && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {errorMsg}
                    </Typography>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
                    <TextField
                        fullWidth
                        label="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        sx={{ mb: 2 }}
                    />

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

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mb: 2 }}
                        disabled={loading} // prevent multiple clicks
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>

                    <Typography>
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;