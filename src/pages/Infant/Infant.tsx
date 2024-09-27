import {
  Autocomplete,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { cbo } from '../../services/cbo';

type Props = {
  index: number;
  value: number;
};

const Infant = ({ value, index, ...other }: Props) => {
  const { register } = useFormContext();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`secao-${index}`}
      aria-labelledby={`secao-${index}`}
      {...other}
      className="w-full p-8 border-b border-x rounded-b-xl"
    >
      <p className="mb-6">Informações da mãe</p>
      <Grid2 container spacing={2} width="100%">
        <Grid2 size={3}>
          <TextField
            fullWidth
            label="Idade"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`motherAge`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="schooling" shrink>
              Escolaridade
            </InputLabel>
            <Select
              label="Escolaridade"
              notched
              defaultValue={''}
              id="motherSchooling"
              {...register('motherSchooling')}
            >
              <MenuItem value={0}>Sem escolaridade</MenuItem>
              <MenuItem value={1}>Fundamental I (1ª a 4ª série)</MenuItem>
              <MenuItem value={2}>Fundamental II (5ª a 8ª série)</MenuItem>
              <MenuItem value={3}>Médio (antigo 2º grau)</MenuItem>
              <MenuItem value={4}>Superior incompleto</MenuItem>
              <MenuItem value={5}>Superior completo</MenuItem>
              <MenuItem value={6}>Indefinido</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={1}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Série"
            {...register('motherClass')}
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
                {...register('motherOccupation')}
              />
            )}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            label="Filhos nascidos vivos"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`bornAlive`)}
          />
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            label="Perdas fetais/abortos"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`bornDead`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            fullWidth
            label="Nº de semanas de gestação"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`weeksPregnant`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="schooling" shrink>
              Tipo de gravidez
            </InputLabel>
            <Select
              label="Tipo de gravidez"
              notched
              defaultValue={''}
              {...register('pregnancyType')}
            >
              <MenuItem value={0}>Única</MenuItem>
              <MenuItem value={1}>Dupla</MenuItem>
              <MenuItem value={2}>Tripla e mais</MenuItem>
              <MenuItem value={3}>Indefinido</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="schooling" shrink>
              Tipo de parto
            </InputLabel>
            <Select
              label="Tipo de parto"
              notched
              defaultValue={''}
              {...register('birthType')}
            >
              <MenuItem value={0}>Vaginal</MenuItem>
              <MenuItem value={1}>Cesáreo</MenuItem>
              <MenuItem value={2}>Indefinido</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="schooling" shrink>
              Morte em relação ao parto
            </InputLabel>
            <Select
              label="Morte em relação ao parto"
              notched
              defaultValue={''}
              {...register('deathRelativeToBirth')}
            >
              <MenuItem value={0}>Antes</MenuItem>
              <MenuItem value={1}>Durante</MenuItem>
              <MenuItem value={2}>Depois</MenuItem>
              <MenuItem value={3}>Indefinido</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            label="Peso ao nascer"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`birthWeight`)}
          />
        </Grid2>
        <Grid2 size={'grow'}>
          <TextField
            fullWidth
            label="Nº da Declaração de Nascido Vivo"
            slotProps={{ inputLabel: { shrink: true } }}
            {...register(`birthCertificateNumber`)}
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Infant;
