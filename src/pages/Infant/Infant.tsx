import {
  Autocomplete,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { cbo } from '../../services/cbo';

type Props = {
  index: number;
  value: number;
};

const Infant = ({ value, index, ...other }: Props) => {
  const { register, control, watch } = useFormContext();
  const watchTypeOfDeath = watch('identification.typeOfDeath');
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`secao-${index}`}
      aria-labelledby={`secao-${index}`}
      {...other}
      className="w-full p-8"
    >
      <p className="mb-6">Informações da mãe</p>
      <Grid2 container spacing={2} width="100%">
        <Grid2 size={3}>
          <TextField
            fullWidth
            label="Idade"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`infant.mothersAge`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="mothersEducation" shrink>
              Escolaridade
            </InputLabel>
            <Select
              label="Escolaridade"
              notched
              defaultValue={''}
              id="motherEducation"
              {...register('infant.mothersEducation')}
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
              <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={1}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Série"
            {...register('infant.mothersClass')}
            fullWidth
          />
        </Grid2>
        <Grid2 size={5}>
          <Autocomplete
            disablePortal
            options={cbo}
            getOptionKey={(option) => option.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ocupação"
                slotProps={{ inputLabel: { shrink: true } }}
                {...register('infant.mothersOccupation')}
              />
            )}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            label="Filhos nascidos vivos"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`infant.bornAlive`)}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            label="Perdas fetais/abortos"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`infant.fetalLoss`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            fullWidth
            label="Nº de semanas de gestação"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`infant.weeksPregnant`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="pregnancyType" shrink>
              Tipo de gravidez
            </InputLabel>
            <Select
              label="Tipo de gravidez"
              notched
              defaultValue={''}
              {...register('infant.pregnancyType')}
            >
              <MenuItem value={'Única'}>Única</MenuItem>
              <MenuItem value={'Dupla'}>Dupla</MenuItem>
              <MenuItem value={'Tripla e mais'}>Tripla e mais</MenuItem>
              <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="birthType" shrink>
              Tipo de parto
            </InputLabel>
            <Select
              label="Tipo de parto"
              notched
              defaultValue={''}
              {...register('infant.birthType')}
            >
              <MenuItem value={'Vaginal'}>Vaginal</MenuItem>
              <MenuItem value={'Cesáreo'}>Cesáreo</MenuItem>
              <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <Controller
            name="infant.deathRelativeToBirth"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel htmlFor="deathRelativeToBirth" shrink>
                  Morte em relação ao parto
                </InputLabel>
                <Select
                  label="Morte em relação ao parto"
                  notched
                  defaultValue={
                    watchTypeOfDeath === 'Fetal' ? 'Não se aplica' : ''
                  }
                  {...field}
                  disabled={watchTypeOfDeath === 'Fetal'}
                >
                  <MenuItem value={'Antes'}>Antes</MenuItem>
                  <MenuItem value={'Durante'}>Durante</MenuItem>
                  <MenuItem value={'Depois'}>Depois</MenuItem>
                  <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            label="Peso ao nascer"
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
              },
              inputLabel: { shrink: true },
            }}
            {...register(`infant.birthWeight`)}
          />
        </Grid2>
        <Grid2 size={'grow'}>
          <TextField
            fullWidth
            label="Nº da Declaração de Nascido Vivo"
            disabled={watchTypeOfDeath === 'Fetal'}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`infant.birthCertificateNumber`)}
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Infant;
