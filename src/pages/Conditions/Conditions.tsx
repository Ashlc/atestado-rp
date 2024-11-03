import {
  Divider,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Controller, get, useFormContext, useWatch } from 'react-hook-form';
import { isInfant } from '../../utils/handleAge';

type Props = {
  index: number;
  value: number;
};
const Conditions = ({ value, index, ...other }: Props) => {
  const [infantDisabled, setInfantDisabled] = useState(false);
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [birth, death] = watch([
    'identification.dateOfBirth',
    'identification.dateOfDeath',
  ]);

  const typeOfDeath = useWatch({
    control,
    name: 'identification.typeOfDeath',
  });

  useEffect(() => {
    if ((typeOfDeath && typeOfDeath === 'Fetal') || isInfant(birth, death)) {
      setInfantDisabled(true);
      setValue('conditions.fertileAgeDeath', 'Não se aplica');
    } else {
      setInfantDisabled(false);
      setValue('conditions.fertileAgeDeath', '');
    }
  }, [typeOfDeath, birth, death, setValue]);

  const renderCauseFields = (withLabel: boolean = true) => {
    const startingIndex = withLabel ? 2 : 4;
    const endingIndex = withLabel ? 3 : 5;
    const fields = [];
    for (let i = startingIndex; i <= endingIndex; i++) {
      fields.push(
        <Grid2
          size={7}
          key={`${i}_cause_${withLabel ? 'primary' : 'secondary'}`}
        >
          <TextField
            fullWidth
            aria-label={withLabel ? `Causa associada ${i}` : ''}
            label={withLabel ? `Devido ou como consequência de:` : ''}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`conditions.cause${i}`)}
          />
        </Grid2>,
        <Grid2
          size={2}
          key={`${i}_time_${withLabel ? 'primary' : 'secondary'}`}
        >
          <Controller
            render={({ field }) => (
              <TimePicker
                value={field.value}
                aria-label="Tempo de evolução"
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
                onChange={field.onChange}
              />
            )}
            name={`conditions.evolutionTime${i}`}
            control={control}
          />
        </Grid2>,
        <Grid2 size={3} key={`${i}_cid_${withLabel ? 'primary' : 'secondary'}`}>
          <TextField
            fullWidth
            aria-label="CID"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`conditions.cid${i}`)}
          />
        </Grid2>,
      );
    }
    return fields;
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
        <Grid2 size={12}>
          <Controller
            name="conditions.fertileAgeDeath"
            control={control}
            rules={{ required: infantDisabled ? false : 'Campo obrigatório' }}
            defaultValue={''}
            render={({ field }) => (
              <FormControl
                fullWidth
                error={!!get(errors, 'conditions.fertileAgeDeath')}
                required={!infantDisabled}
              >
                <InputLabel htmlFor="fertileAgeDeath" shrink>
                  Em caso de óbito de mulher em idade fértil, a morte ocorreu:
                </InputLabel>
                <Select
                  label="Em caso de óbito de mulher em idade fértil, a morte ocorreu:"
                  notched
                  id="fertileAgeDeath"
                  disabled={infantDisabled}
                  {...field}
                >
                  <MenuItem value={'Na gravidez'}>Na gravidez</MenuItem>
                  <MenuItem value={'No parto'}>No parto</MenuItem>
                  <MenuItem value={'No abortamento'}>No abortamento</MenuItem>
                  <MenuItem value={'Até 42 dias após o término da gestação'}>
                    Até 42 dias após o término da gestação
                  </MenuItem>
                  <MenuItem
                    value={'De 43 dias até um 1 após o término da gestação'}
                  >
                    De 43 dias até um 1 após o término da gestação
                  </MenuItem>
                  <MenuItem value={'Não ocorreu nestes períodos'}>
                    Não ocorreu nestes períodos
                  </MenuItem>
                  <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
                </Select>
                <FormHelperText>
                  {get(errors, 'conditions.fertileAgeDeath')?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid2>
        <Grid2 size={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="receivedMedicalAssistance" shrink>
              Recebeu assistência médica durantre a doença que ocasionou a
              morte?
            </InputLabel>
            <Select
              label="Recebeu assistência médica durantre a doença que ocasionou a morte?"
              notched
              defaultValue={''}
              id="receivedMedicalAssistance"
              {...register('conditions.receivedMedicalAssistance')}
            >
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
              <MenuItem value="Não se aplica">Não se aplica</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="necropsy" shrink>
              Diagnóstico confirmado por necrópsia?
            </InputLabel>
            <Select
              label="Diagnóstico confirmado por necrópsia?"
              notched
              defaultValue={''}
              id="necropsy"
              {...register('conditions.necropsy')}
            >
              <MenuItem value="Sim">Sim</MenuItem>
              <MenuItem value="Não">Não</MenuItem>
              <MenuItem value="Não se aplica">Não se aplica</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={12}>
          <Divider />
        </Grid2>
        <Grid2 size={12}>
          <h2 className="mb-1 font-semibold">Causas da morte</h2>
          <p className="text-sm mb-2">
            Doença ou estado mórbido que causou diretamente a morte:
          </p>
        </Grid2>
        <Grid2 size={7}>
          <TextField
            fullWidth
            label="Causa básica"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('conditions.cause1')}
          />
        </Grid2>
        <Grid2 size={2}>
          <Controller
            render={({ field }) => (
              <TimePicker
                label="Tempo de evolução"
                value={field.value}
                onChange={field.onChange}
                slotProps={{
                  textField: {
                    InputLabelProps: {
                      shrink: true,
                    },
                    fullWidth: true,
                  },
                }}
              />
            )}
            name="conditions.evolutionTime1"
            control={control}
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            fullWidth
            label="CID"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('conditions.cid1')}
          />
        </Grid2>
        {renderCauseFields()}
        <Grid2 size={12}>
          <p className="text-sm mb-2">
            Outras condições significativas que contribuíram para a morte, e que
            não entraram, porém, na cadeia acima:
          </p>
        </Grid2>
        {renderCauseFields(false)}
      </Grid2>
    </div>
  );
};

export default Conditions;
