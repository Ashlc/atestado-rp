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

type Props = {
  index: number;
  value: number;
};
const External = ({ value, index, ...other }: Props) => {
  const { register, watch, setValue } = useFormContext();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`secao-${index}`}
      aria-labelledby={`secao-${index}`}
      {...other}
      className="w-full p-8 border-b border-x rounded-b-xl"
    >
      <Grid2 container spacing={2} width="100%">
        <Grid2 size={12}>
          <p>Prováveis circunstâncias de morte não natural</p>
          <p className="text-sm mb-3">
            Informações de caráter estritamente epidemiológico
          </p>
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="fertileAgeDeath" shrink>
              Tipo não natural
            </InputLabel>
            <Select
              label="Tipo não natural"
              notched
              id="nonNaturalType"
              {...register('nonNaturalType')}
            >
              <MenuItem value={0}>Acidente</MenuItem>
              <MenuItem value={1}>Suicídio</MenuItem>
              <MenuItem value={2}>Homicídio</MenuItem>
              <MenuItem value={3}>Outros</MenuItem>
              <MenuItem value={4}>Indeterminado</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <FormControl fullWidth>
            <InputLabel htmlFor="workplaceAccident" shrink>
              Acidente de trabalho?
            </InputLabel>
            <Select
              label="Acidente de trabalho?"
              notched
              id="workplaceAccident"
              {...register('workplaceAccident')}
            >
              <MenuItem value={0}>Sim</MenuItem>
              <MenuItem value={1}>Não</MenuItem>
              <MenuItem value={2}>Indeterminado</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="informationSource" shrink>
              Fonte da informação?
            </InputLabel>
            <Select
              label="Fonte da informação?"
              notched
              id="informationSource"
              {...register('informationSource')}
            >
              <MenuItem value={0}>Ocorrência policial</MenuItem>
              <MenuItem value={1}>Família</MenuItem>
              <MenuItem value={2}>Não</MenuItem>
              <MenuItem value={3}>Outra</MenuItem>
              <MenuItem value={4}>Indeterminado</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={5}>
          <TextField
            slotProps={{ inputLabel: { shrink: true } }}
            label="Nº do boletim de ocorrência"
            disabled={watch('informationSource') !== 0}
            fullWidth
            {...register(`occurrenceNumber`)}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Descrição sumária do evento"
            {...register(`eventDescription`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="occurencePlaceType" shrink>
              Tipo de local de ocorrência
            </InputLabel>
            <Select
              label="Tipo de local de ocorrência"
              notched
              id="occurencePlaceType"
              {...register('occurencePlaceType')}
            >
              <MenuItem value={0}>Via pública</MenuItem>
              <MenuItem value={1}>Estabelecimento de residência</MenuItem>
              <MenuItem value={2}>Outro domicílio</MenuItem>
              <MenuItem value={3}>Estabelecimento comercial</MenuItem>
              <MenuItem value={4}>Outros</MenuItem>
              <MenuItem value={5}>Indeterminado</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={2}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="CEP"
            {...register(`occurenceAddress.cep`)}
            onBlur={(e) =>
              handleCep(e.target.value, 'occurenceAddress', setValue)
            }
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Logradouro"
            {...register(`occurenceAddress.street`)}
          />
        </Grid2>
        <Grid2 size={3}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Bairro"
            {...register(`occurenceAddress.district`)}
          />
        </Grid2>
        <Grid2 size={4}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Município"
            {...register(`occurenceAddress.city`)}
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="UF"
            {...register(`occurenceAddress.state`)}
          />
        </Grid2>
        <Grid2 size={1}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Número"
            {...register(`occurenceAddress.number`)}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            label="Complemento"
            {...register(`occurenceAddress.complement`)}
          />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default External;
