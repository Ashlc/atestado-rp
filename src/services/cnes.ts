import axios, { AxiosRequestConfig } from 'axios';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { handleCep } from './viacep';

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const a = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  timeout: 10000,
  headers: defaultHeaders,
});

// Does not work, needs to be implemented in the backend due to cors.

export const fetchCNES = async (cnes: string) => {
  console.log(cnes);
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/cnes/${cnes}`,
  };

  const response = await a.request(config);
  const { data } = response;
  console.log(data);
  return data;
};

export const handleCNES = async (
  cnes: string,
  setValue: UseFormSetValue<FieldValues>,
) => {
  if (!cnes && cnes.length < 7) return;
  try {
    const data = await fetchCNES(cnes);
    setValue('occurrence.establishmentName', data.nome_fantasia);
    setValue(
      'occurrence.hospitalAddress.zipCode',
      data.codigo_cep_estabelecimento,
    );
    handleCep(
      data.codigo_cep_estabelecimento,
      'occurrence.hospitalAddress',
      setValue,
    );
    setValue('occurrence.hospitalAddress.number', data.numero_estabelecimento);
  } catch (error) {
    console.error(error);
  }
};
