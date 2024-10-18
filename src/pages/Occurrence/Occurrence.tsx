import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { handleCep } from '../../services/viacep';
import { handleCNES } from '../../services/cnes';

type Props = {
  index: number;
  value: number;
};

const Occurence = ({ value, index, ...other }: Props) => {
  const { register, setValue } = useFormContext();

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
              {...register('occurrence.placeType')}
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
            {...register('occurrence.cnes')}
            fullWidth
            onBlur={(e) => handleCNES(e.target.value, setValue)}
          />
        </Grid2>
        <Grid2 size={5}>
          <TextField
            label="Nome do estabelecimento"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('occurrence.establishmentName')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            label="CEP"
            id="occurrence.hospitalAddress.zipCode"
            {...register('occurrence.hospitalAddress.zipCode')}
            onBlur={(e) =>
              handleCep(e.target.value, 'occurrence.hospitalAddress', setValue)
            }
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            label="Logradouro"
            {...register('occurrence.hospitalAddress.street')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            label="Bairro"
            {...register('occurrence.hospitalAddress.neighborhood')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            label="Município"
            {...register('occurrence.hospitalAddress.city')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            label="UF"
            {...register('occurrence.hospitalAddress.state')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            label="Número"
            {...register('occurrence.hospitalAddress.number')}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            label="Complemento"
            {...register('occurrence.hospitalAddress.complement')}
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
