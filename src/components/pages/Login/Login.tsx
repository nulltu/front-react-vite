import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../utils/constants';

import './login.css';

export interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginObject = { email, password };

  const loginMutationFn = async (loginData: ILogin): Promise<string> => {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    return response.data;
  };

  const mutationOptions: UseMutationOptions<string, Error, ILogin, unknown> = {
    mutationFn: loginMutationFn,
  };

  const mutation = useMutation<string, Error, ILogin>(mutationOptions);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await mutation.mutateAsync(loginObject);
      if (response === undefined || response === null) {
        toast.error('Ups! Something went wrong');
      } else {
        localStorage.setItem('token', response);
        toast.success('Login successful');
        navigate('/layout');
      }
    } catch (error) {
      toast.error('Ups! Something went wrong');
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '45ch' },
        marginTop: '200px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleLogin}
      method="POST"
    >
      <TextField label="Email" focused value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" focused value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained" disabled={mutation.isPending}>
        Login
      </Button>
      <Toaster />
    </Box>
  );
}
