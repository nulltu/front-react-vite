import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import toast, { Toaster } from 'react-hot-toast';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { userService } from '../../services/users.service';
import { BASE_URL, TOKEN } from '../../../utils/constants';

export interface ICreateData {
  apellido: string;
  empresa: string;
  ingreso: string;
  nacimiento: string;
  nombre: string;
  puesto: string;
}

export default function EditUser() {
  const { id } = useParams();
  const numericId: number = id !== undefined ? parseInt(id, 10) : NaN;

  const navigate = useNavigate();

  const [apellido, setApellido] = React.useState('');
  const [empresa, setEmpresa] = React.useState('');
  const [ingreso, setIngreso] = React.useState('');
  const [nacimiento, setNacimiento] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [puesto, setPuesto] = React.useState('');

  const [dateIngreso, setDateIngreso] = React.useState<Dayjs | null | Date>(null);
  const [dateNacimiento, setDateNacimiento] = React.useState<Dayjs | Date | null>(null);

  const getUserById = async (userId: number) => {
    try {
      const response = await userService.getUserById(userId);

      const formatNacimiento = dayjs(response.nacimiento, 'DD/MM/YYYY').toDate();
      const formatIngreso = dayjs(response.ingreso, 'DD/MM/YYYY').toDate();

      setApellido(response.apellido || '');
      setNombre(response.nombre || '');
      setPuesto(response.puesto || '');
      setEmpresa(response.empresa || '');
      setApellido(response.apellido || '');
      setNacimiento(response.nacimiento || '');
      setIngreso(response.ingreso || '');
      setDateNacimiento(formatNacimiento || null);
      setDateIngreso(formatIngreso || null);
    } catch (error) {
      toast.error('Ups! Error');
    }
  };

  React.useEffect(() => {
    getUserById(numericId);
  }, []);

  const validateForm = () =>
    apellido === '' || nombre === '' || empresa === '' || ingreso === '' || puesto === '' || nacimiento === '';

  const userObject = { apellido, empresa, ingreso, nacimiento, nombre, puesto };

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

  const handleDateChangeIngreso = (date: string | Dayjs | null) => {
    const formatted = formatDateToString(date);
    setIngreso(formatted);
  };

  const handleDateChangeBirth = (date: string | Dayjs | null) => {
    const formatted = formatDateToString(date);
    setNacimiento(formatted);
  };

  const navigateToUsers = () => {
    navigate('/users');
  };

  const handleFormSubmit = async (userId: number | undefined) => {
    try {
      await axios.put(`${BASE_URL}/empleados/${userId}`, userObject, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      navigateToUsers();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
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
          value={dayjs(dateIngreso)}
          onChange={(date) => {
            setDateIngreso(date);
            handleDateChangeIngreso(date);
          }}
          format="DD/MM/YYYY"
        />
        <DatePicker
          label="Nacimiento"
          value={dayjs(dateNacimiento)}
          onChange={(date) => {
            setDateNacimiento(date);
            handleDateChangeBirth(date);
          }}
          format="DD/MM/YYYY"
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          onClick={() => handleFormSubmit(numericId)}
          disabled={validateForm()}
          style={{
            backgroundColor: validateForm() ? 'rgb(49, 49, 49)' : '#2196F3',
            color: '#FFFFFF',
          }}
        >
          Edit user
        </Button>
      </Box>
      <Toaster />
    </>
  );
}
