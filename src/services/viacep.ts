import axios, { AxiosRequestConfig } from 'axios';
import { UseFormSetValue } from 'react-hook-form';

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
};

const a = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
  timeout: 10000,
  headers: defaultHeaders,
});

export const fetchCep = async (cep: string) => {
  console.log(`Fetching data for CEP: ${cep}`);
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${cep}/json`,
  };

  const response = await a.request(config);
  const { data } = response;
  return data;
};

export const handleCep = async (cep: string, base: string, setValue: UseFormSetValue<any>) => {
  if (!cep || cep.length < 8) {
    console.error('Invalid CEP:', cep);
    return;
  }
  if (!base) {
    console.error('Base is not provided');
    return;
  }
  try {
    const fields = ['street', 'neighborhood', 'city', 'uf'];
    const dataFields = ['logradouro', 'bairro', 'localidade', 'uf'];

    const data = await fetchCep(cep);
    console.log('Fetched data:', data);

    if (data.erro) {
      console.error('CEP not found:', cep);
      return;
    }

    setValue(`${base}.zipCode`, cep.replace(/(\d{5})(\d{3})/, '$1-$2'));
    fields.forEach((field, index) => {
      const value = data[dataFields[index]];
      console.log(`Updating field ${base}.${field} with value: ${value}`);
      setValue(`${base}.${field}`, value);
    });
    // Note: We can't set focus using setValue, so you might need to handle this differently
  } catch (error) {
    console.error('Error fetching CEP data:', error);
  }
};
