import { AxiosResponse } from 'axios';
import ISymptoms from 'src/interfaces/Symptoms';
import { IUser } from 'src/interfaces/User';

export const getUser = () => JSON.parse(localStorage.getItem('user')) || null;

export const setUser = (data: AxiosResponse<IUser> | null) =>
  localStorage.setItem('user', JSON.stringify(data));

export const getSymptomsListFromStorage = (): ISymptoms[] =>
  JSON.parse(sessionStorage.getItem('symptomsList')) || null;

export const setSymptomsListInStorage = (symptomsList: ISymptoms[]) =>
  sessionStorage.setItem('symptomsList', JSON.stringify(symptomsList));
