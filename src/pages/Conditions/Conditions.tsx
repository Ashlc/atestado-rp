import {
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { isInfant } from '../../utils/handleAge';

type Props = {
  index: number;
  value: number;
};
const Conditions = ({ value, index, ...other }: Props) => {
  const [infantDisabled, setInfantDisabled] = useState(false);
  const { register, control, watch } = useFormContext();
  const typeOfDeath = watch('typeOfDeath');
  const [birth, death] = watch(['dateOfBirth', 'dateOfDeath']);
  useEffect(() => {
    console.log('typeOfDeath', typeOfDeath);
    console.log('isInfant', isInfant(birth, death));
    if ((typeOfDeath && typeOfDeath === 'fetal') || isInfant(birth, death)) {
      setInfantDisabled(true);
    }
  }, [typeOfDeath, birth, death]);

  console.log(infantDisabled);
  const renderCauseFields = (withLabel: boolean = true) => {
    const fields = [];
    for (let i = 2; i <= 3; i++) {
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
            {...register(`cause${i}`)}
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
            name={`evolutionTime${i}`}
            control={control}
          />
        </Grid2>,
        <Grid2 size={3} key={`${i}_cid_${withLabel ? 'primary' : 'secondary'}`}>
          <TextField
            fullWidth
            aria-label="CID"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`cid${i}`)}
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
      className="w-full p-8 border-b border-x rounded-b-xl min-h-[600px]"
    >
      <Grid2 container spacing={2} width="100%">
        <Grid2 size={12}>
          <Controller
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel htmlFor="fertileAgeDeath" shrink>
                  Em caso de óbito de mulher em idade fértil, a morte ocorreu:
                </InputLabel>
                <Select
                  label="Em caso de óbito de mulher em idade fértil, a morte ocorreu:"
                  notched
                  id="fertileAgeDeath"
                  defaultValue={infantDisabled ? '6' : ''}
                  readOnly={infantDisabled}
                  {...field}
                >
                  <MenuItem value={0}>Na gravidez</MenuItem>
                  <MenuItem value={1}>No parto</MenuItem>
                  <MenuItem value={2}>No abortamento</MenuItem>
                  <MenuItem value={3}>
                    Até 42 dias após o término da gestação
                  </MenuItem>
                  <MenuItem value={4}>
                    De 43 dias até um 1 após o término da gestação
                  </MenuItem>
                  <MenuItem value={5}>Não ocorreu nestes períodos</MenuItem>
                  <MenuItem value={6}>Indefinido</MenuItem>
                </Select>
              </FormControl>
            )}
            name="fertileAgeDeath"
            control={control}
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
              {...register('receivedMedicalAssistance')}
            >
              <MenuItem value={0}>Sim</MenuItem>
              <MenuItem value={1}>Não</MenuItem>
              <MenuItem value={2}>Indefinido</MenuItem>
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
              {...register('necropsy')}
            >
              <MenuItem value={0}>Sim</MenuItem>
              <MenuItem value={1}>Não</MenuItem>
              <MenuItem value={2}>Indefinido</MenuItem>
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
            {...register('cause1')}
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
            name="evolutionTime1"
            control={control}
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            fullWidth
            label="CID"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('cid1')}
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
