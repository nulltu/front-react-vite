import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import toast, { Toaster } from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers';
import { BASE_URL, TOKEN } from '../../../utils/constants';

export interface ICreateData {
  apellido: string;
  empresa: string;
  ingreso: string;
  nacimiento: string;
  nombre: string;
  puesto: string;
}

export default function CreateUser() {
  const navigate = useNavigate();

  const [apellido, setApellido] = React.useState('');
  const [empresa, setEmpresa] = React.useState('');
  const [ingreso, setIngreso] = React.useState('');
  const [nacimiento, setNacimiento] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [puesto, setPuesto] = React.useState('');

  const [dateIngreso, setDateIngreso] = React.useState(null);
  const [dateNacimiento, setDateNacimiento] = React.useState(null);

  const resetForm = () => {
    setApellido('');
    setNombre('');
    setEmpresa('');
    setIngreso('');
    setNacimiento('');
    setPuesto('');
    setDateIngreso(null);
    setDateNacimiento(null);
  };

  const validateForm = () =>
    apellido === '' || nombre === '' || empresa === '' || ingreso === '' || puesto === '' || nacimiento === '';

  const userObject = { apellido, empresa, ingreso, nacimiento, nombre, puesto };

  const createMutationFn = async (createData: ICreateData): Promise<string> => {
    const response = await axios.post(`${BASE_URL}/empleados`, createData, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    return response.data;
  };

  const mutationOptions: UseMutationOptions<string, Error, ICreateData, unknown> = {
    mutationFn: createMutationFn,
  };

  const mutation = useMutation<string, Error, ICreateData>(mutationOptions);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(userObject);
      toast.success('User created successfully');
      resetForm();
    } catch (error) {
      toast.error('Ups! Something went wrong');
    }
  };

  const navigateToLayout = async () => {
    navigate('/layout');
  };

  const formatDateToString = (date: any) => {
    if (!date || !date.$isDayjsObject) return '';

    const day = String(date.$D).padStart(2, '0');
    const month = String(date.$M + 1).padStart(2, '0');
    const year = date.$y;

    return `${day}/${month}/${year}`;
  };

  const handleDateChangeIngreso = (date: string) => {
    const formatted = formatDateToString(date);
    setIngreso(formatted);
  };

  const handleDateChangeBirth = (date: string) => {
    const formatted = formatDateToString(date);
    setNacimiento(formatted);
  };

  return (
    <>
      <HomeIcon className="icon__home" onClick={navigateToLayout} />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '45ch' },
          marginTop: '100px',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        noValidate
        autoComplete="off"
        method="POST"
      >
        <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} variant="outlined" />
        <TextField label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        <TextField label="Puesto" value={puesto} onChange={(e) => setPuesto(e.target.value)} />
        <TextField label="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
        <DatePicker
          label="Ingreso"
          value={dateIngreso}
          onChange={(date) => {
            setDateIngreso(date);
            if (date !== null) {
              handleDateChangeIngreso(date);
            }
          }}
          format="DD/MM/YYYY"
        />
        <DatePicker
          label="Nacimiento"
          value={dateNacimiento}
          onChange={(date) => {
            setDateNacimiento(date);
            if (date !== null) {
              handleDateChangeBirth(date);
            }
          }}
          format="DD/MM/YYYY"
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          onClick={handleCreate}
          disabled={mutation.isPending || validateForm()}
          style={{
            backgroundColor: mutation.isPending || validateForm() ? 'rgb(49, 49, 49)' : '#2196F3',
            color: '#FFFFFF',
          }}
        >
          Create user
        </Button>
      </Box>
      <Toaster />
    </>
  );
}
