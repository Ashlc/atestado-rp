import {
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { Controller, get, useFormContext } from 'react-hook-form';

type Props = {
  index: number;
  value: number;
};

const Doctor = ({ value, index, ...other }: Props) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const dateOfDeath = watch('identification.dateOfDeath');

  const validateCRM = (value: string) => {
    if (!value) {
      return 'CRM é obrigatório';
    }
    const crmRegex = /^CRM\/[A-Z]{2}\s\d{4,6}$/;
    return (
      crmRegex.test(value) ||
      'Formato de CRM inválido. Exemplo correto: CRM/SP 123456'
    );
  };

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
            error={get(errors, 'doctor.name')}
            helperText={get(errors, 'doctor.name')?.message}
            required
            {...register(`doctor.name`, { required: 'Campo obrigatório' })}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="CRM"
            error={get(errors, 'doctor.crm')}
            helperText={get(errors, 'doctor.crm')?.message}
            required
            {...register(`doctor.crm`, {
              required: 'Campo obrigatório',
              validate: validateCRM,
            })}
          />
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth error={!!get(errors, 'doctor.confirmedBy')}>
            <InputLabel htmlFor="doctor.confirmedBy" shrink>
              Óbito atestado por médico
            </InputLabel>
            <Select
              label="Óbito atestado por médico"
              notched
              defaultValue={''}
              id="doctor.confirmedBy"
              {...register('doctor.confirmedBy', {
                required: 'Campo obrigatório',
              })}
            >
              <MenuItem value={'Assistente'}>Assistente</MenuItem>
              <MenuItem value={'Substituto'}>Substituto</MenuItem>
              <MenuItem value={'IML'}>IML</MenuItem>
              <MenuItem value={'SVO'}>SVO</MenuItem>
              <MenuItem value={'Outro'}>Outro</MenuItem>
            </Select>
            <FormHelperText>
              {get(errors, 'doctor.confirmedBy')?.message}
            </FormHelperText>
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
            error={get(errors, 'doctor.contact')}
            helperText={get(errors, 'doctor.contact')?.message}
            required
            {...register(`doctor.contact`, { required: 'Campo obrigatório' })}
          />
        </Grid2>
        <Grid2 size={2}>
          <Controller
            name="doctor.confirmationDate"
            control={control}
            defaultValue={''}
            rules={{
              validate: {
                dateReference: (v) =>
                  dayjs(v).diff(dateOfDeath, 'day') >= 0 ||
                  `A data de atestado não pode ser anterior à data de óbito.`,
              },
            }}
            render={({ field }) => (
              <TextField
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                label="Data de atestado"
                fullWidth
                error={!!get(errors, 'doctor.confirmationDate')}
                helperText={get(errors, 'doctor.confirmationDate')?.message}
                {...field}
              />
            )}
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Doctor;
