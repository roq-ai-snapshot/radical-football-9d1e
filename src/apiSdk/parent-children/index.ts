import axios from 'axios';
import queryString from 'query-string';
import { ParentChildInterface } from 'interfaces/parent-child';
import { GetQueryInterface } from '../../interfaces';

export const getParentChildren = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/parent-children${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createParentChild = async (parentChild: ParentChildInterface) => {
  const response = await axios.post('/api/parent-children', parentChild);
  return response.data;
};

export const updateParentChildById = async (id: string, parentChild: ParentChildInterface) => {
  const response = await axios.put(`/api/parent-children/${id}`, parentChild);
  return response.data;
};

export const getParentChildById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/parent-children/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteParentChildById = async (id: string) => {
  const response = await axios.delete(`/api/parent-children/${id}`);
  return response.data;
};
