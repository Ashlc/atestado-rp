import { Divider, Stack } from '@mui/material';
import RatingSelector from '../../components/RatingSelector/RatingSelector';

type Props = {
  index: number;
  value: number;
};

const Feedback = ({ value, index, ...other }: Props) => {
  const questions = [
    'Eu acho que gostaria de usar esse sistema com frequência.',
    'Eu achei o sistema desnecessariamente complexo.',
    'Eu achei o sistema fácil de usar.',
    'Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o sistema.',
    'Eu acho que as várias funções do sistema estão muito bem integradas.',
    'Eu acho que o sistema apresenta muita inconsistência.',
    'Eu imagino que as pessoas aprenderão como usar esse sistema rapidamente.',
    'Eu achei o sistema atrapalhado de usar.',
    'Eu me senti confiante ao usar o sistema.',
    'Eu precisei aprender várias coisas novas antes de conseguir usar o sistema.',
  ];

  const ratingSlider = (question: string, index: number) => (
    <RatingSelector question={question} index={index} />
  );

  return (
    <Stack
      role="tabpanel"
      hidden={value !== index}
      id={`secao-${index}`}
      aria-labelledby={`secao-${index}`}
      {...other}
      className="w-full flex flex-col items-center p-8 border-b border-x rounded-b-xl min-h-[600px]"
      spacing={3}
    >
      <p className="w-10/12 sm:w-2/3 xl:w-1/3">
        Por favor, responda as perguntas abaixo com base na sua experiência com
        o sistema.
      </p>
      <Divider className="w-10/12 sm:w-2/3 xl:w-1/3" />
      <Stack spacing={5} className="w-10/12 sm:w-2/3 xl:w-1/3">
        {questions.map((question, index) => (
          <div key={`feedback_${index}`}>{ratingSlider(question, index)}</div>
        ))}
      </Stack>
    </Stack>
  );
};

export default Feedback;
