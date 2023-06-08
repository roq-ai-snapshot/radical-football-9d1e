import axios from 'axios';
import queryString from 'query-string';
import { CoachAcademyInterface } from 'interfaces/coach-academy';
import { GetQueryInterface } from '../../interfaces';

export const getCoachAcademies = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/coach-academies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCoachAcademy = async (coachAcademy: CoachAcademyInterface) => {
  const response = await axios.post('/api/coach-academies', coachAcademy);
  return response.data;
};

export const updateCoachAcademyById = async (id: string, coachAcademy: CoachAcademyInterface) => {
  const response = await axios.put(`/api/coach-academies/${id}`, coachAcademy);
  return response.data;
};

export const getCoachAcademyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/coach-academies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCoachAcademyById = async (id: string) => {
  const response = await axios.delete(`/api/coach-academies/${id}`);
  return response.data;
};
