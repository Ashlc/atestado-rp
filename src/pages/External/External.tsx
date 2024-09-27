import {
  Autocomplete,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  index: number;
  value: number;
};
const External = ({ value, index, ...other }: Props) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`secao-${index}`}
      aria-labelledby={`secao-${index}`}
      {...other}
      className="w-full p-8 border-b border-x rounded-b-xl min-h-[600px]"
    >
      <Grid2 container spacing={2} width="100%"></Grid2>
    </div>
  );
};

export default External;
