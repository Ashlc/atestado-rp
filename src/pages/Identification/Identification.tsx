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
import { Controller, useFormContext } from 'react-hook-form';
import { cbo } from '../../services/cbo';
import { handleCep } from '../../services/viacep';
import { handleAge } from '../../utils/handleAge';
import React, { useEffect } from 'react';

type Props = {
  index: number;
  value: number;
};

const Identification = ({ value, index, ...other }: Props) => {
  const { register, watch, control, setValue } = useFormContext();
  const watchTypeOfDeath = watch('identification.typeOfDeath');
  const watchDateOfDeath = watch('identification.dateOfDeath');
  const watchDateOfBirth = watch('identification.dateOfBirth');

  useEffect(() => {
    if (watchTypeOfDeath === 'Fetal' && watchDateOfDeath) {
      setValue('identification.dateOfBirth', watchDateOfDeath);
    }
  }, [watchTypeOfDeath, watchDateOfDeath, setValue]);

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
          <Controller
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel shrink>Tipo de óbito</InputLabel>
                <Select
                  label="Tipo de óbito"
                  notched
                  {...field}
                  value={field.value || ''}
                >
                  <MenuItem value={'Fetal'}>Fetal</MenuItem>
                  <MenuItem value={'Não fetal'}>Não Fetal</MenuItem>
                </Select>
              </FormControl>
            )}
            name="identification.typeOfDeath"
            control={control}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            label="Data do óbito"
            fullWidth
            {...register('identification.dateOfDeath')}
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
            name="identification.hourOfDeath"
            control={control}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Nome do falecido"
            {...register('identification.deceasedName')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Nome da mãe"
            {...register('identification.mothersName')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Nome do pai"
            {...register('identification.fathersName')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Naturalidade"
            {...register('identification.naturalness')}
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
                disabled={watchTypeOfDeath === 'Fetal'}
                value={watchTypeOfDeath === 'Fetal' ? watchDateOfDeath : ''}
              />
            )}
            name="identification.dateOfBirth"
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
                value={handleAge(watchDateOfBirth, watchDateOfDeath)}
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
            <Select
              label="Sexo"
              notched
              defaultValue={''}
              {...register('identification.sex')}
            >
              <MenuItem value={'M'}>Masculino</MenuItem>
              <MenuItem value={'F'}>Feminino</MenuItem>
              <MenuItem value={'I'}>Indeterminado</MenuItem>
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
              {...register('identification.race')}
            >
              <MenuItem value={'Branca'}>Branca</MenuItem>
              <MenuItem value={'Preta'}>Preta</MenuItem>
              <MenuItem value={'Amarela'}>Amarela</MenuItem>
              <MenuItem value={'Parda'}>Parda</MenuItem>
              <MenuItem value={'Indígena'}>Indígena</MenuItem>
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
              {...register('identification.maritalStatus')}
            >
              <MenuItem value={'Solteiro(a)'}>Solteiro(a)</MenuItem>
              <MenuItem value={'Casado(a)'}>Casado(a)</MenuItem>
              <MenuItem value={'Divorciado(a)'}>Divorciado(a)</MenuItem>
              <MenuItem value={'Viúvo(a)'}>Viúvo(a)</MenuItem>
              <MenuItem value={'Separado(a)'}>Separado(a)</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Cartão do SUS"
            {...register('identification.susCard')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="education" shrink>
              Escolaridade
            </InputLabel>
            <Select
              label="Escolaridade"
              notched
              defaultValue={''}
              id="education"
              {...register('identification.education')}
            >
              <MenuItem value={'Sem escolaridade'}>Sem escolaridade</MenuItem>
              <MenuItem value={'Fundamental I (1ª a 4ª série)'}>
                Fundamental I (1ª a 4ª série)
              </MenuItem>
              <MenuItem value={'Fundamental II (5ª a 8ª série)'}>
                Fundamental II (5ª a 8ª série)
              </MenuItem>
              <MenuItem value={'Médio (antigo 2º grau)'}>
                Médio (antigo 2º grau)
              </MenuItem>
              <MenuItem value={'Superior incompleto'}>
                Superior incompleto
              </MenuItem>
              <MenuItem value={'Superior completo'}>Superior completo</MenuItem>
              <MenuItem value={'Indeterminado'}>Indeterminado</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={1}>
          <TextField
            type="number"
            slotProps={{ inputLabel: { shrink: true } }}
            label="Série"
            {...register('identification.class')}
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
                {...register('identification.occupation')}
              />
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <p>Endereço do falecido</p>
        </Grid2>
        <Grid2 size={2}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                id="identification.deceasedAddress.cep"
                slotProps={{ inputLabel: { shrink: true } }}
                label="CEP"
                fullWidth
                onBlur={(e) => {
                  if (e.target.value) {
                    handleCep(
                      e.target.value,
                      'identification.deceasedAddress',
                      setValue,
                    );
                  }
                }}
              />
            )}
            name="identification.deceasedAddress.zipCode"
            control={control}
          />
        </Grid2>
        <Grid2 size={8}>
          <Controller
            name="identification.deceasedAddress.street"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                slotProps={{ inputLabel: { shrink: true } }}
                label="Logradouro"
                fullWidth
              />
            )}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Número"
            {...register('identification.deathPlace.number')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Bairro"
            {...register('identification.deceasedAddress.neighborhood')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={5}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Cidade"
            {...register('identification.deceasedAddress.city')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="UF"
            {...register('identification.deceasedAddress.state')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Complemento"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('identification.deceasedAddress.complement')}
            fullWidth
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Identification;
