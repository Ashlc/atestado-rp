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
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { cbo } from '../../services/cbo';
import { handleCep } from '../../services/viacep';
import { handleAge } from '../../utils/handleAge';

type Props = {
  index: number;
  value: number;
};

const Identification = ({ value, index, ...other }: Props) => {
  const { register, watch, control, setValue } = useFormContext();
  const watchTypeOfDeath = watch('typeOfDeath');
  const watchDateOfDeath = watch('dateOfDeath');
  const watchDateOfBirth = watch('dateOfBirth');

  useEffect(() => {
    if (watchTypeOfDeath === 'fetal' && watchDateOfDeath) {
      setValue('dateOfBirth', watchDateOfDeath);
    }
    if (watchDateOfBirth && watchDateOfDeath) {
      const age = handleAge(watchDateOfBirth, watchDateOfDeath);
      setValue('age', age);
    }
  }, [watchTypeOfDeath, watchDateOfDeath, watchDateOfBirth, setValue]);

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
            slotProps={{ inputLabel: { shrink: true } }}
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
            slotProps={{ inputLabel: { shrink: true } }}
            label="Nome do falecido"
            {...register('deceasedName')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Nome da mãe"
            {...register('mothersName')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Nome do pai"
            {...register('fathersName')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Naturalidade"
            {...register('naturalness')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={2}>
          <Controller
            render={({ field }) => (
              <TextField
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                label="Data de nascimento"
                fullWidth
                {...field}
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
                slotProps={{
                  input: { readOnly: true },
                  inputLabel: { shrink: true },
                }}
                {...field}
                fullWidth
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
            slotProps={{ inputLabel: { shrink: true } }}
            label="Cartão do SUS"
            {...register('susCard')}
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
              notched
              defaultValue={''}
              id="schooling"
              {...register('schooling')}
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
            type="number"
            slotProps={{ inputLabel: { shrink: true } }}
            label="Série"
            {...register('class')}
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
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('occupation')}
              />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <p>Endereço do falecido</p>
        </Grid2>
        <Grid2 size={2}>
          <Controller
            name="deathPlace.zipCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="deceasedAddress.cep"
                slotProps={{ inputLabel: { shrink: true } }}
                label="CEP"
                fullWidth
                onBlur={(e) => {
                  if (e.target.value) {
                    handleCep(e.target.value, 'deceasedAddress', setValue);
                  }
                }}
              />
            )}
          />
        </Grid2>
        <Grid2 size={8}>
          <Controller
            name="deathPlace.street"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="deceasedAddress.street"
                slotProps={{ inputLabel: { shrink: true } }}
                label="Logradouro"
                fullWidth
              />
            )}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            id="deceasedAddress.number"
            slotProps={{ inputLabel: { shrink: true } }}
            label="Número"
            {...register('deathPlace.number')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            id="deceasedAddress.neighborhood"
            slotProps={{ inputLabel: { shrink: true } }}
            label="Bairro"
            {...register('deathPlace.neighborhood')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={5}>
          <TextField
            id="deceasedAddress.city"
            slotProps={{ inputLabel: { shrink: true } }}
            label="Cidade"
            {...register('deathPlace.city')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            id="deceasedAddress.uf"
            slotProps={{ inputLabel: { shrink: true } }}
            label="UF"
            {...register('deathPlace.uf')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            id="deceasedAddress.complement"
            label="Complemento"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('deathPlace.complement')}
            fullWidth
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Identification;
