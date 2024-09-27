import axios, { AxiosRequestConfig } from 'axios';

const defaultHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
};

const a = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
  timeout: 10000,
  headers: defaultHeaders,
});

export const fetchCep = async (cep: string) => {
  console.log(cep);
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${cep}/json`,
  };

  const response = await a.request(config);
  const { data } = response;
  return data;
};

export const handleCep = async (cep: string, base: string) => {
  if (!cep && cep.length < 8) return;
  if (!base) return;
  try {
    const fields = ['street', 'neighborhood', 'city', 'uf'];
    const dataFields = ['logradouro', 'bairro', 'localidade', 'uf'];

    const data = await fetchCep(cep);
    (document.getElementById(`${base}.cep`) as HTMLInputElement).value =
      cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    fields.forEach((field, index) => {
      const id = `${base}.${field}`;
      const value = data[dataFields[index]];
      const element = document.getElementById(id) as HTMLInputElement;
      console.log(element);
      if (element) {
        element.value = value;
      }
    });
    (document.getElementById(`${base}.number`) as HTMLInputElement).focus();
  } catch (error) {
    console.error(error);
  }
};
