import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, get, useFormContext } from 'react-hook-form';
import { cbo } from '../../services/cbo';
import { educationClasses } from '../Identification/utils';

type Props = {
  index: number;
  value: number;
  isEnabled: boolean;
};

const Infant = ({ value, index, isEnabled, ...other }: Props) => {
  const {
    register,
    control,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = useFormContext();
  const watchTypeOfDeath = watch('identification.typeOfDeath');
  const watchEducation = watch('infant.mothersEducation');

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
        <Grid2 size={1}>
          <TextField
            fullWidth
            label="Idade"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`infant.mothersAge`, {
              required: isEnabled ? 'Este campo é obrigatório' : false,
            })}
            error={get(errors, 'infant.mothersAge')}
            helperText={get(errors, 'infant.mothersAge')?.message}
            required={isEnabled}
          />
        </Grid2>
        <Grid2 size={3}>
          <Controller
            name="infant.mothersEducation"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel htmlFor="infant.mothersEducation" shrink>
                  Escolaridade
                </InputLabel>
                <Select
                  label="Escolaridade"
                  notched
                  id="infant.mothersEducation"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    resetField('identification.class', { defaultValue: '' });
                  }}
                >
                  <MenuItem value={'Sem escolaridade'}>
                    Sem escolaridade
                  </MenuItem>
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
                  <MenuItem value={'Superior completo'}>
                    Superior completo
                  </MenuItem>
                  <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid2>
        <Grid2 size={2}>
          <Controller
            name="infant.mothersClass"
            render={({ field }) =>
              watchEducation ? (
                <FormControl fullWidth>
                  <InputLabel shrink>Série</InputLabel>
                  <Select
                    defaultValue={''}
                    label="Série"
                    notched
                    disabled={educationClasses[watchEducation].length === 0}
                    {...field}
                    onChange={(e) => {
                      console.log(e.target.value);
                      console.log(educationClasses[watchEducation]);
                      field.onChange(e.target.value);
                    }}
                  >
                    {educationClasses[watchEducation].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  slotProps={{ inputLabel: { shrink: true } }}
                  label="Série"
                  fullWidth
                  disabled
                />
              )
            }
            control={control}
          />
        </Grid2>
        <Grid2 size={6}>
          <Autocomplete
            disablePortal
            options={cbo}
            getOptionKey={(option) => option.value}
            onChange={(_, selectedOption) => {
              setValue(
                'infant.mothersCBO',
                selectedOption ? String(selectedOption.value) : '',
              );
            }}
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
            error={get(errors, 'infant.bornAlive')}
            helperText={get(errors, 'infant.bornAlive')?.message}
            required={isEnabled}
            {...register(`infant.bornAlive`, {
              required: isEnabled ? 'Este campo é obrigatório' : false,
            })}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            label="Perdas fetais/abortos"
            slotProps={{ inputLabel: { shrink: true } }}
            error={get(errors, 'infant.fetalLoss')}
            helperText={get(errors, 'infant.fetalLoss')?.message}
            required={isEnabled}
            {...register(`infant.fetalLoss`, {
              required: isEnabled ? 'Este campo é obrigatório' : false,
            })}
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            fullWidth
            label="Nº de semanas de gestação"
            slotProps={{ inputLabel: { shrink: true } }}
            error={get(errors, 'infant.weeksPregnant')}
            helperText={get(errors, 'infant.weeksPregnant')?.message}
            required={isEnabled}
            {...register(`infant.weeksPregnant`, {
              required: isEnabled ? 'Este campo é obrigatório' : false,
            })}
          />
        </Grid2>
        <Grid2 size={3}>
          <FormControl
            fullWidth
            required={isEnabled}
            error={get(errors, 'infant.pregnancyType')}
          >
            <InputLabel htmlFor="pregnancyType" shrink>
              Tipo de gravidez
            </InputLabel>
            <Select
              label="Tipo de gravidez"
              notched
              defaultValue={''}
              {...register('infant.pregnancyType', {
                required: isEnabled ? 'Este campo é obrigatório' : false,
              })}
            >
              <MenuItem value={'Única'}>Única</MenuItem>
              <MenuItem value={'Dupla'}>Dupla</MenuItem>
              <MenuItem value={'Tripla e mais'}>Tripla e mais</MenuItem>
              <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
            </Select>
            <FormHelperText>
              {get(errors, 'infant.pregnancyType')?.message}
            </FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl
            fullWidth
            required={isEnabled}
            error={!!get(errors, 'infant.birthType')}
          >
            <InputLabel htmlFor="birthType" shrink>
              Tipo de parto
            </InputLabel>
            <Select
              label="Tipo de parto"
              notched
              defaultValue={''}
              {...register('infant.birthType', {
                required: isEnabled ? 'Este campo é obrigatório' : false,
              })}
            >
              <MenuItem value={'Vaginal'}>Vaginal</MenuItem>
              <MenuItem value={'Cesáreo'}>Cesáreo</MenuItem>
              <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
            </Select>
            <FormHelperText>
              {get(errors, 'infant.birthType')?.message}
            </FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <Controller
            name="infant.deathRelativeToBirth"
            control={control}
            rules={{
              required:
                watchTypeOfDeath !== 'Fetal' && isEnabled
                  ? 'Campo obrigatório'
                  : false,
            }}
            defaultValue={watchTypeOfDeath === 'Fetal' ? 'Não se aplica' : ''}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!get(errors, 'infant.deathRelativeToBirth')}
              >
                <InputLabel
                  htmlFor="deathRelativeToBirth"
                  required={watchTypeOfDeath !== 'Fetal' && isEnabled}
                  shrink
                >
                  Morte em relação ao parto
                </InputLabel>
                <Select
                  label="Morte em relação ao parto"
                  notched
                  {...field}
                  disabled={watchTypeOfDeath === 'Fetal'}
                >
                  <MenuItem value={'Antes'}>Antes</MenuItem>
                  <MenuItem value={'Durante'}>Durante</MenuItem>
                  <MenuItem value={'Depois'}>Depois</MenuItem>
                  <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
                </Select>
                <FormHelperText>
                  {get(errors, 'infant.deathRelativeToBirth')?.message}
                </FormHelperText>
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
            error={!!get(errors, 'infant.birthWeight')}
            helperText={get(errors, 'infant.birthWeight')?.message}
            {...register(`infant.birthWeight`)}
          />
        </Grid2>
        <Grid2 size={'grow'}>
          <TextField
            fullWidth
            label="Nº da Declaração de Nascido Vivo"
            error={!!get(errors, 'infant.birthCertificateNumber')}
            helperText={get(errors, 'infant.birthCertificateNumber')?.message}
            disabled={watchTypeOfDeath === 'Fetal'}
            required={watchTypeOfDeath !== 'Fetal' && isEnabled}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`infant.birthCertificateNumber`, {
              required:
                watchTypeOfDeath !== 'Fetal' && isEnabled
                  ? 'Campo obrigatório'
                  : false,
            })}
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Infant;
