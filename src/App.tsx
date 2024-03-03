import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Login from './components/pages/Login/Login';
import TableUsers from './components/pages/TableUsers/TableUsers';
import CreateUser from './components/pages/Createuser/CreateUser';
import Layout from './components/pages/Layout/Layout';
import EditUser from './components/pages/EditUser/EditUsers';

const queryClient = new QueryClient();

function App() {
  return (
    <div style={{ backgroundColor: 'whitesmoke' }}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="users" element={<TableUsers />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="edit-user/:id" element={<EditUser />} />
            <Route path="layout" element={<Layout />} />]
          </Routes>
        </LocalizationProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
