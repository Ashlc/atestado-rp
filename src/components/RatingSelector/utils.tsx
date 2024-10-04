import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { colors, IconContainerProps, Rating, styled } from '@mui/material';

const feedbackLabels: { [index: string]: string } = {
  1: 'Discordo totalmente',
  2: 'Discordo parcialmente',
  3: 'Neutro',
  4: 'Concordo parcialmente',
  5: 'Concordo totalmente',
};

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: feedbackLabels[1],
  },
  2: {
    icon: <SentimentDissatisfiedIcon sx={{ color: colors.orange[500] }} />,
    label: feedbackLabels[2],
  },
  3: {
    icon: <SentimentSatisfiedIcon sx={{ color: colors.amber[500] }} />,
    label: feedbackLabels[3],
  },
  4: {
    icon: <SentimentSatisfiedAltIcon sx={{ color: colors.lightGreen[500] }} />,
    label: feedbackLabels[4],
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: feedbackLabels[5],
  },
};

const IconContainer = (props: IconContainerProps) => {
  const { value, ...other } = props;
  return (
    <span className="mx-4" {...other}>
      {customIcons[value].icon}
    </span>
  );
};
export { customIcons, feedbackLabels, IconContainer, StyledRating };
