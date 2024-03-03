/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { BASE_URL, IFilter, TOKEN } from '../../utils/constants';

interface Params {
  [key: string]: any;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
export const userService = {
  async getUsers() {
    const { data } = await axiosInstance.get('/empleados');
    return data;
  },

  async deleteUser(userId: number) {
    const { data } = await axiosInstance.delete(`/empleados/${userId}`);
    return data;
  },

  async filterUsers(filter: IFilter) {
    const params: Params = Object.entries(filter)
      .filter(([key, value]) => value !== undefined && value !== null && value !== '')
      .reduce((acc: Params, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    try {
      const { data } = await axiosInstance.get(`/empleados/filter`, {
        params,
      });
      return data;
    } catch (error) {
      console.error('Error al filtrar usuarios:', error);
      throw error;
    }
  },

  async getUserById(userId: number) {
    const { data } = await axiosInstance.get(`/empleados/${userId}`);
    return data;
  },
};
