import {
  Autocomplete,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cbo } from '../../services/cbo';
import { handleCep } from '../../services/viacep';

type Props = {
  index: number;
  value: number;
};

const Identification = ({ value, index, ...other }: Props) => {
  const { register, control, watch, setValue } = useFormContext();
  const [dateOfBirth, setDateOfBirth] = useState('');
  const watchTypeOfDeath = watch('typeOfDeath');
  const watchDateOfDeath = watch('dateOfDeath');
  const watchDateOfBirth = watch('dateOfBirth');

  useEffect(() => {
    if (watchTypeOfDeath === 'fetal' && watchDateOfDeath) {
      setDateOfBirth(watchDateOfDeath);
    }
  }, [watchTypeOfDeath, watchDateOfDeath]);

  useEffect(() => {
    const dateOfBirth = dayjs(watch('dateOfBirth'));
    const dateOfDeath = dayjs(watch('dateOfDeath'));
    const age = dateOfDeath.diff(dateOfBirth, 'year');
    if (age >= 0) {
      setValue('age', age);
    }
  }, [watchDateOfBirth, watchDateOfDeath]);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`secao-${index}`}
      aria-labelledby={`secao-${index}`}
      {...other}
      className="w-full p-8 border-b border-x rounded-b-xl"
    >
      <Grid2 container spacing={2} width="100%">
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel shrink>Tipo de óbito</InputLabel>
            <Select
              label="Tipo de óbito"
              defaultValue={''}
              notched
              {...register('typeOfDeath')}
            >
              <MenuItem value={'fetal'}>Fetal</MenuItem>
              <MenuItem value={'não fetal'}>Não fetal</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            type="date"
            InputLabelProps={{ shrink: true }}
            label="Data do óbito"
            fullWidth
            {...register('dateOfDeath')}
          />
        </Grid2>
        <Grid2 size={2}>
          <Controller
            render={({ field }) => (
              <TimePicker
                label="Hora do óbito"
                value={field.value}
                onChange={field.onChange}
              />
            )}
            name="hourOfDeath"
            control={control}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            {...register('deceasedName')}
            InputLabelProps={{ shrink: true }}
            label="Nome do falecido"
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            {...register('mothersName')}
            InputLabelProps={{ shrink: true }}
            label="Nome da mãe"
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            {...register('fathersName')}
            InputLabelProps={{ shrink: true }}
            label="Nome do pai"
            fullWidth
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            {...register('naturalness')}
            InputLabelProps={{ shrink: true }}
            label="Naturalidade"
            fullWidth
          />
        </Grid2>
        <Grid2 size={2}>
          <Controller
            render={({ field }) => (
              <TextField
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Data de nascimento"
                value={dateOfBirth}
                fullWidth
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                  field.onChange(e);
                }}
              />
            )}
            name="dateOfBirth"
            control={control}
          />
        </Grid2>
        <Grid2 size={2}>
          <Controller
            render={({ field }) => (
              <TextField
                label="Idade"
                type="number"
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                value={field.value}
              />
            )}
            name="age"
            control={control}
          />
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel shrink>Sexo</InputLabel>
            <Select label="Sexo" notched defaultValue={''} {...register('sex')}>
              <MenuItem value={'M'}>Masculino</MenuItem>
              <MenuItem value={'F'}>Feminino</MenuItem>
              <MenuItem value={'I'}>Indefinido</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel shrink>Raça</InputLabel>
            <Select
              label="Raça"
              defaultValue={''}
              notched
              {...register('race')}
            >
              <MenuItem value={'branca'}>Branca</MenuItem>
              <MenuItem value={'preta'}>Preta</MenuItem>
              <MenuItem value={'amarela'}>Amarela</MenuItem>
              <MenuItem value={'parda'}>Parda</MenuItem>
              <MenuItem value={'indígena'}>Indígena</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel shrink>Estado civil</InputLabel>
            <Select
              label="Estado civil"
              defaultValue={''}
              notched
              {...register('maritalStatus')}
            >
              <MenuItem value={'solteiro(a)'}>Solteiro(a)</MenuItem>
              <MenuItem value={'casado(a)'}>Casado(a)</MenuItem>
              <MenuItem value={'divorciado(a)'}>Divorciado(a)</MenuItem>
              <MenuItem value={'viúvo(a)'}>Viúvo(a)</MenuItem>
              <MenuItem value={'separado(a)'}>Separado(a)</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            {...register('susCard')}
            InputLabelProps={{ shrink: true }}
            label="Cartão do SUS"
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="schooling" shrink>
              Escolaridade
            </InputLabel>
            <Select
              label="Escolaridade"
              {...register('schooling')}
              notched
              defaultValue={''}
              id="schooling"
            >
              <MenuItem value={0}>Sem escolaridade</MenuItem>
              <MenuItem value={1}>Fundamental I (1ª a 4ª série)</MenuItem>
              <MenuItem value={2}>Fundamental II (5ª a 8ª série)</MenuItem>
              <MenuItem value={3}>Médio (antigo 2º grau)</MenuItem>
              <MenuItem value={4}>Superior incompleto</MenuItem>
              <MenuItem value={5}>Superior completo</MenuItem>
              <MenuItem value={6}>Indefinido</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={1}>
          <TextField
            {...register('class')}
            type="number"
            InputLabelProps={{ shrink: true }}
            label="Série"
            fullWidth
          />
        </Grid2>
        <Grid2 size={'grow'}>
          <Autocomplete
            disablePortal
            options={cbo}
            getOptionKey={(option) => option.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ocupação"
                InputLabelProps={{ shrink: true }}
                {...register('occupation')}
              />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <p>Endereço do falecido</p>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            id="deceasedAddress.cep"
            InputLabelProps={{ shrink: true }}
            label="CEP"
            {...register('deathPlace.cep')}
            onBlur={(e) => {
              if (e.target.value) {
                handleCep(e.target.value, 'deceasedAddress');
              }
            }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={8}>
          <TextField
            id="deceasedAddress.street"
            InputLabelProps={{ shrink: true }}
            {...register('deathPlace.street')}
            label="Logradouro"
            fullWidth
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            id="deceasedAddress.number"
            InputLabelProps={{ shrink: true }}
            {...register('deathPlace.number')}
            label="Número"
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            id="deceasedAddress.neighborhood"
            InputLabelProps={{ shrink: true }}
            {...register('deathPlace.neighborhood')}
            label="Bairro"
            fullWidth
          />
        </Grid2>
        <Grid2 size={5}>
          <TextField
            id="deceasedAddress.city"
            InputLabelProps={{ shrink: true }}
            {...register('deathPlace.city')}
            label="Cidade"
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            id="deceasedAddress.uf"
            InputLabelProps={{ shrink: true }}
            {...register('deathPlace.uf')}
            label="UF"
            fullWidth
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            id="deceasedAddress.complement"
            {...register('deathPlace.complement')}
            label="Complemento"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Identification;
