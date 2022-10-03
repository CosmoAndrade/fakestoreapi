import * as React from 'react';
import { useContext } from 'react'
import { useState } from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

export default function Login() {

    const navigator = useNavigate()
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    const {
        login
    } = useContext(AuthContext)

    function handleLogin() {
        api.post('auth/login', { username: user, password: pass })
            .then((response) => {
                console.log(response)
                login(user , pass , response.data.token)
                navigator('/products')

            })
    }


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        label="Username"
                        name="text"
                        type="text"
                        autoComplete="text"
                        autoFocus
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                    />


                    <Button

                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        underline="none"
                        onClick={handleLogin}

                    >

                        Entrar
                    </Button>











                </Box>
            </Box>

        </Container>

    );
}