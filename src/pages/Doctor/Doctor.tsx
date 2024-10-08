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

const Doctor = ({ value, index, ...other }: Props) => {
  const { register, control, watch } = useFormContext();
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
        <Grid2 size={8}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Nome do médico"
            {...register(`doctor.name`)}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="CRM"
            {...register(`doctor.crm`)}
          />
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="doctor.confirmedBy" shrink>
              Óbito atestado por médico
            </InputLabel>
            <Select
              label="Óbito atestado por médico"
              notched
              defaultValue={''}
              id="doctor.confirmedBy"
              {...register('doctor.confirmedBy')}
            >
              <MenuItem value={'Assistente'}>Assistente</MenuItem>
              <MenuItem value={'Substituto'}>Substituto</MenuItem>
              <MenuItem value={'IML'}>IML</MenuItem>
              <MenuItem value={'SVO'}>SVO</MenuItem>
              <MenuItem value={'Outro'}>Outro</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Município e UF do SVO ou IML"
            disabled={
              watch('doctor.confirmedBy') !== 'IML' &&
              watch('doctor.confirmedBy') !== 'SVO'
            }
            {...register(`doctor.city`)}
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Meio de comunicação (telefone, e-mail, etc)"
            {...register(`doctor.contact`)}
          />
        </Grid2>
        <Grid2 size={2}>
          <Controller
            render={({ field }) => (
              <TextField
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                label="Data de atestado"
                fullWidth
                {...field}
              />
            )}
            name="doctor.confirmationDate"
            control={control}
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Doctor;
