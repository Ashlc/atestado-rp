import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { handleCep } from '../../services/viacep';

type Props = {
  index: number;
  value: number;
};

const Occurence = ({ value, index, ...other }: Props) => {
  const { register, control, setValue } = useFormContext();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`secao-${index}`}
      aria-labelledby={`secao-${index}`}
      {...other}
      className="w-full p-8"
    >
      <Grid2 container spacing={2} width="100%">
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel shrink>Local da ocorrência do óbito</InputLabel>
            <Select
              label="Local da ocorrência do óbito"
              defaultValue={''}
              notched
              {...register('occurence.placeType')}
            >
              <MenuItem value={'Hospital'}>Hospital</MenuItem>
              <MenuItem value={'Outro estabelecimento de saúde'}>
                Outro estabelecimentos de saúde
              </MenuItem>
              <MenuItem value={'Via pública'}>Via pública</MenuItem>
              <MenuItem value={'Domicílio'}>Domicílio</MenuItem>
              <MenuItem value={'Outros'}>Outros</MenuItem>
              <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            label="Código CNES"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('occurence.cnes')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={5}>
          <Controller
            render={({ field }) => (
              <TextField
                label="Nome do estabelecimento"
                slotProps={{ inputLabel: { shrink: true } }}
                {...field}
                fullWidth
              />
            )}
            name="occurence.establishmentName"
            control={control}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            label="CEP"
            id="occurence.hospitalAddress.zipCode"
            {...register('occurence.hospitalAddress.zipCode')}
            onBlur={(e) =>
              handleCep(e.target.value, 'occurence.hospitalAddress', setValue)
            }
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            label="Logradouro"
            {...register('occurence.hospitalAddress.street')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            label="Bairro"
            {...register('occurence.hospitalAddress.neighborhood')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            label="Município"
            {...register('occurence.hospitalAddress.city')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            label="UF"
            {...register('occurence.hospitalAddress.state')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            label="Número"
            {...register('occurence.hospitalAddress.number')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Complemento"
            {...register('occurence.hospitalAddress.complement')}
            id="hospitalAddress.complement"
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Occurence;
