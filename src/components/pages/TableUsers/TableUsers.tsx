import * as React from 'react';
import Box from '@mui/material/Box';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import toast, { Toaster } from 'react-hot-toast';
import './tableUsers.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import { userService } from '../../services/users.service';
import AlertDialog from '../../../utils/AlertDialog';
import { IFilter } from '../../../utils/constants';

export interface IEmpleado {
  apellido: string;
  empresa: string;
  ingreso: string;
  nacimiento: string;
  nombre: string;
  puesto: string;
  id: number;
}

export default function TableUsers() {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [empleados, setEmpleados] = React.useState([]);
  const [filterNombre, setFilterNombre] = React.useState('');
  const [filterEmpresa, setFilterEmpresa] = React.useState('');

  const loadEmployees = async () => {
    try {
      const userData = await userService.getUsers();
      setEmpleados(userData);
    } catch (error) {
      toast.error('Ups! Error');
    }
  };

  const handleFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    const params: IFilter = {
      empresa: filterEmpresa,
      nombre: filterNombre,
      apellido: '',
      ingreso: '',
      nacimiento: '',
      puesto: '',
    };
    try {
      const userData = await userService.filterUsers(params);
      setEmpleados(userData);
    } catch (error) {
      toast.error('Ups! Error');
    }
  };

  React.useEffect(() => {
    loadEmployees();
  }, []);

  const navigateToLayout = async () => {
    navigate('/layout');
  };

  const isValidateForm = () =>
    (filterNombre !== '' && filterEmpresa === '') ||
    (filterNombre === '' && filterEmpresa !== '') ||
    (filterNombre !== '' && filterEmpresa !== '');

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <HomeIcon className="icon__home" onClick={navigateToLayout} />
      <Box sx={{ paddingLeft: 5, paddingRight: 5 }}>
        <form noValidate autoComplete="off" onSubmit={handleFilter}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            alignItems="center"
            p={2}
          >
            <TextField
              required
              variant="outlined"
              fullWidth
              sx={{
                margin: { xs: '0 0 5px 0', sm: '0 10px 0 0' },
              }}
              label="Nombre del empleado"
              value={filterNombre}
              onChange={(e) => setFilterNombre(e.target.value)}
            />
            <TextField
              required
              label="Empresa"
              value={filterEmpresa}
              onChange={(e) => setFilterEmpresa(e.target.value)}
              variant="outlined"
              fullWidth
              sx={{
                margin: { xs: '5px 0 0 0', sm: '0 0 0 10px' },
              }}
            />
            <Box mt={{ xs: 2, sm: 0 }} ml={{ xs: 0, sm: 2 }}>
              <Button type="submit" variant="contained" disabled={!isValidateForm()} startIcon={<Search />}>
                Search
              </Button>
            </Box>
          </Box>
        </form>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="font__bold">ID</TableCell>
                <TableCell className="font__bold">Empleado</TableCell>
                <TableCell align="right" className="font__bold">
                  Empresa
                </TableCell>
                <TableCell align="right" className="font__bold">
                  Puesto
                </TableCell>
                <TableCell align="right" className="font__bold">
                  Ingreso
                </TableCell>
                <TableCell align="right" className="font__bold">
                  Nacimiento
                </TableCell>
                <TableCell align="right" className="font__bold">
                  Eliminar
                </TableCell>
                <TableCell align="right" className="font__bold">
                  Editar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empleados?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((empleado: IEmpleado) => (
                <TableRow key={empleado.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{`${empleado.id}`}</TableCell>
                  <TableCell>{`${empleado.nombre} ${empleado.apellido}`}</TableCell>
                  <TableCell align="right">{`${empleado.empresa}`}</TableCell>
                  <TableCell align="right">{empleado.puesto}</TableCell>
                  <TableCell align="right">{empleado.ingreso}</TableCell>
                  <TableCell align="right">{empleado.nacimiento}</TableCell>
                  <TableCell align="right">
                    <AlertDialog
                      id={empleado.id}
                      loadEmployees={loadEmployees}
                      fullName={`${empleado.nombre} ${empleado.apellido}`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/edit-user/${empleado.id}`}>
                      <EditIcon className="icon__edit" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={empleados.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      <Toaster />
    </>
  );
}
