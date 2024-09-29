import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import {
  customIcons,
  feedbackLabels,
  IconContainer,
  StyledRating,
} from './utils';

type Props = {
  question: string;
  index: number;
};

const RatingSelector = ({ question, index }: Props) => {
  const [value, setValue] = useState<number | null>(-1);
  const [hover, setHover] = useState(-1);
  return (
    <Stack spacing={2}>
      <p className="text-sm">
        {index + 1}. {question}
      </p>
      <Stack direction="row" className="h-fit p-4 border rounded-md w-full">
        <StyledRating
          itemScope
          name={question}
          IconContainerComponent={IconContainer}
          highlightSelectedOnly
          getLabelText={(value: number) => customIcons[value].label}
          precision={1}
          max={5}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          size="large"
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>
            {feedbackLabels[hover !== -1 ? hover : value]}
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default RatingSelector;
