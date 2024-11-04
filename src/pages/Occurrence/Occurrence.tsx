import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { get, useFormContext } from 'react-hook-form';
import { handleCep } from '../../services/viacep';
import { handleCNES } from '../../services/cnes';
import { useEffect } from 'react';

type Props = {
  index: number;
  value: number;
};

const Occurence = ({ value, index, ...other }: Props) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const fields = [
      'occurrence.placeType',
      'occurrence.hospitalAddress.zipCode',
      'occurrence.hospitalAddress.street',
      'occurrence.hospitalAddress.neighborhood',
      'occurrence.hospitalAddress.city',
      'occurrence.hospitalAddress.state',
      'occurrence.hospitalAddress.number',
      'occurrence.hospitalAddress.complement',
    ];
    fields.forEach((field) => {
      register(field as keyof FormValues, {
        required: 'Este campo é obrigatório',
      });
    });
  }, [register]);

  const watchPlaceType = watch('occurrence.placeType');

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
          <FormControl
            fullWidth
            required
            error={!!get(errors, 'occurrence.placeType')}
          >
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
            <FormHelperText>
              {get(errors, 'occurrence.placeType')?.message}
            </FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            label="Código CNES"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('occurrence.cnes')}
            fullWidth
            error={get(errors, 'occurrence.cnes')}
            helperText={get(errors, 'occurrence.cnes')?.message}
            required={watchPlaceType === 'Hospital'}
            onBlur={(e) => handleCNES(e.target.value, setValue)}
          />
        </Grid2>
        <Grid2 size={5}>
          <TextField
            label="Nome do estabelecimento"
            slotProps={{ inputLabel: { shrink: true } }}
            error={get(errors, 'occurrence.establishmentName')}
            helperText={get(errors, 'occurrence.establishmentName')?.message}
            required={watchPlaceType === 'Hospital'}
            disabled={watchPlaceType === 'Hospital'}
            {...register('occurrence.establishmentName')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            label="CEP"
            id="occurrence.hospitalAddress.zipCode"
            {...register('occurrence.hospitalAddress.zipCode')}
            error={get(errors, 'occurrence.hospitalAddress.zipCode')}
            helperText={
              get(errors, 'occurrence.hospitalAddress.zipCode')?.message
            }
            required
            disabled={watchPlaceType === 'Hospital'}
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
            error={get(errors, 'occurrence.hospitalAddress.street')}
            helperText={
              get(errors, 'occurrence.hospitalAddress.street')?.message
            }
            required
            disabled={watchPlaceType === 'Hospital'}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            label="Bairro"
            {...register('occurrence.hospitalAddress.neighborhood')}
            error={get(errors, 'occurrence.hospitalAddress.neighborhood')}
            helperText={
              get(errors, 'occurrence.hospitalAddress.neighborhood')?.message
            }
            required
            disabled={watchPlaceType === 'Hospital'}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            label="Município"
            {...register('occurrence.hospitalAddress.city')}
            error={get(errors, 'occurrence.hospitalAddress.city')}
            helperText={get(errors, 'occurrence.hospitalAddress.city')?.message}
            required
            disabled={watchPlaceType === 'Hospital'}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            label="UF"
            {...register('occurrence.hospitalAddress.state')}
            error={get(errors, 'occurrence.hospitalAddress.state')}
            helperText={
              get(errors, 'occurrence.hospitalAddress.state')?.message
            }
            required
            disabled={watchPlaceType === 'Hospital'}
            slotProps={{ inputLabel: { shrink: true } }}
            fullWidth
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            label="Número"
            {...register('occurrence.hospitalAddress.number')}
            error={get(errors, 'occurrence.hospitalAddress.number')}
            helperText={
              get(errors, 'occurrence.hospitalAddress.number')?.message
            }
            required
            disabled={watchPlaceType === 'Hospital'}
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
