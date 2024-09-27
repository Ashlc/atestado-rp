import axios, { AxiosRequestConfig } from 'axios';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const a = axios.create({
  baseURL: 'https://apidadosabertos.saude.gov.br/cnes/estabelecimentos',
  withCredentials: false,
  timeout: 10000,
  headers: defaultHeaders,
});

// Does not work, needs to be implemented in the backend due to cors.

export const fetchCNES = async (cnes: string) => {
  console.log(cnes);
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${cnes}`,
  };

  const response = await a.request(config);
  console.log(response);
  const { data } = response;
  return data;
};

export const handleCNES = async (
  cnes: string,
  setValue: UseFormSetValue<FieldValues>,
) => {
  if (!cnes && cnes.length < 7) return;
  try {
    const data = await fetchCNES(cnes);
    setValue('establishmentName', data.nome_razao_social);
  } catch (error) {
    console.error(error);
  }
};
