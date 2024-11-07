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

type Props = {
  index: number;
  value: number;
};
const External = ({ value, index, ...other }: Props) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const validateCep = (value: string) => {
    if (value && value.length !== 8) {
      return 'O CEP deve ter 8 dígitos';
    }
    return true;
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
          <p>Prováveis circunstâncias de morte não natural</p>
          <p className="text-sm mb-3">
            Informações de caráter estritamente epidemiológico
          </p>
        </Grid2>
        <Grid2 size={2}>
          <FormControl
            fullWidth
            error={!!get(errors, 'external.nonNaturalType')}
          >
            <InputLabel htmlFor="nonNaturalType" shrink>
              Tipo não natural
            </InputLabel>
            <Select
              label="Tipo não natural"
              notched
              id="nonNaturalType"
              defaultValue={''}
              {...register('external.nonNaturalType')}
            >
              <MenuItem value={'Acidente'}>Acidente</MenuItem>
              <MenuItem value={'Suicídio'}>Suicídio</MenuItem>
              <MenuItem value={'Homicídio'}>Homicídio</MenuItem>
              <MenuItem value={'Outros'}>Outros</MenuItem>
              <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
            </Select>
            <FormHelperText>
              {get(errors, 'external.nonNaturalType')?.message}
            </FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl
            fullWidth
            error={!!get(errors, 'external.workplaceAccident')}
          >
            <InputLabel htmlFor="workplaceAccident" shrink>
              Acidente de trabalho?
            </InputLabel>
            <Select
              label="Acidente de trabalho?"
              defaultValue={''}
              notched
              id="workplaceAccident"
              {...register('external.workplaceAccident')}
            >
              <MenuItem value={'Sim'}>Sim</MenuItem>
              <MenuItem value={'Não'}>Não</MenuItem>
              <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
            </Select>
            <FormHelperText>
              {get(errors, 'external.workplaceAccident')?.message}
            </FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={3}>
          <FormControl
            fullWidth
            error={!!get(errors, 'external.informationSource')}
          >
            <InputLabel htmlFor="informationSource" shrink>
              Fonte da informação?
            </InputLabel>
            <Select
              label="Fonte da informação?"
              defaultValue={''}
              notched
              id="informationSource"
              {...register('external.informationSource')}
            >
              <MenuItem value={'Ocorrência policial'}>
                Ocorrência policial
              </MenuItem>
              <MenuItem value={'Família'}>Família</MenuItem>
              <MenuItem value={'Não'}>Não</MenuItem>
              <MenuItem value={'Outra'}>Outra</MenuItem>
              <MenuItem value={'Indetermiando'}>Não se aplica</MenuItem>
            </Select>
            <FormHelperText>
              {get(errors, 'external.informationSource')?.message}
            </FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={5}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Nº do boletim de ocorrência"
            disabled={
              watch('external.informationSource') !== 'Ocorrência policial'
            }
            required={
              watch('external.informationSource') === 'Ocorrência policial'
            }
            error={!!get(errors, 'external.occurrenceNumber')}
            helperText={get(errors, 'external.occurrenceNumber')?.message}
            fullWidth
            {...register(`external.occurrenceNumber`, {
              required:
                watch('external.informationSource') === 'Ocorrência policial'
                  ? 'Campo obrigatório'
                  : false,
            })}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Descrição sumária do evento"
            {...register(`external.occurrenceDescription`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <FormControl fullWidth error={!!get(errors, 'external.placeType')}>
            <InputLabel htmlFor="occurrencePlaceType" shrink>
              Tipo de local de ocorrência
            </InputLabel>
            <Select
              label="Tipo de local de ocorrência"
              defaultValue={''}
              notched
              id="occurrencePlaceType"
              {...register('external.placeType')}
            >
              <MenuItem value={'Via pública'}>Via pública</MenuItem>
              <MenuItem value={'Estabelecimento de residência'}>
                Endereço de residência
              </MenuItem>
              <MenuItem value={'Outro domicílio'}>Outro domicílio</MenuItem>
              <MenuItem value={'Estabelecimento comercial'}>
                Estabelecimento comercial
              </MenuItem>
              <MenuItem value={'Outros'}>Outros</MenuItem>
              <MenuItem value={'Não se aplica'}>Não se aplica</MenuItem>
            </Select>
            <FormHelperText>
              {get(errors, 'external.placeType')?.message}
            </FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="CEP"
            error={!!get(errors, 'external.occurrenceAddress.cep')}
            helperText={get(errors, 'external.occurrenceAddress.cep')?.message}
            {...register(`external.occurrenceAddress.cep`, {
              validate: validateCep,
            })}
            onBlur={(e) =>
              handleCep(e.target.value, 'external.occurrenceAddress', setValue)
            }
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Logradouro"
            {...register(`external.occurrenceAddress.street`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Bairro"
            {...register(`external.occurrenceAddress.neighborhood`)}
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Município"
            {...register(`external.occurrenceAddress.city`)}
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="UF"
            {...register(`external.occurrenceAddress.state`)}
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Número"
            {...register(`external.occurrenceAddress.number`)}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Complemento"
            {...register(`external.occurrenceAddress.complement`)}
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default External;
