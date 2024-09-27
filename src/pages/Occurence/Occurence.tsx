import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  index: number;
  value: number;
};

const Occurence = ({ value, index, ...other }: Props) => {
  const { register, control } = useFormContext();

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
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel shrink>Local da ocorrência do óbito</InputLabel>
            <Select
              label="Local da ocorrência do óbito"
              defaultValue={''}
              notched
              {...register('placeOfOccurrence')}
            >
              <MenuItem value={'hospital'}>Hospital</MenuItem>
              <MenuItem value={'outro_saude'}>
                Outros estabelecimentos de saúde
              </MenuItem>
              <MenuItem value={'domicilio'}>Domicílio</MenuItem>
              <MenuItem value={'viaPublica'}>Via pública</MenuItem>
              <MenuItem value={'outro'}>Outros</MenuItem>
              <MenuItem value={'ignorado'}>Ignorado</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            label="Código CNES"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('cnesCode')}
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
            name="establishmentName"
            control={control}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            label="CEP"
            {...register('hospitalAddress.zipCode')}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            label="Logradouro"
            {...register('hospitalAddress.street')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            label="Bairro"
            {...register('hospitalAddress.neighborhood')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            label="Município"
            {...register('hospitalAddress.city')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            label="UF"
            {...register('hospitalAddress.state')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            label="Número"
            {...register('hospitalAddress.number')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Complemento"
            {...register('hospitalAddress.complement')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Occurence;
