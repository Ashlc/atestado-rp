import { FileOpen } from '@mui/icons-material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Button, Stack, Tooltip } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import dayjs from 'dayjs';
import { SyntheticEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { z } from 'zod';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import Conditions from './pages/Conditions/Conditions';
import Doctor from './pages/Doctor/Doctor';
import External from './pages/External/External';
import Feedback from './pages/Feedback/Feedback';
import Identification from './pages/Identification/Identification';
import Infant from './pages/Infant/Infant';
import Occurrence from './pages/Occurrence/Occurrence';
import formSchema from './schemas/Sections';
import Certificate from './utils/certificate';
import { flattenObject } from './utils/flattenObject';
import { isInfant } from './utils/handleAge';

type FormType = z.infer<typeof formSchema>;

function App() {
  const cert = new Certificate(null);
  const [activeTab, setActiveTab] = useState(0);
  const methods = useForm<FormType>();
  const [birth, death] = methods.watch([
    'identification.dateOfBirth',
    'identification.dateOfDeath',
  ]);
  const typeOfDeath = methods.watch('identification.typeOfDeath');
  const infantDisabled =
    !(typeOfDeath && typeOfDeath === 'Fetal') && !isInfant(birth, death);

  const onSubmit = (data: FormType) => {
    console.log(data);
    const formattedData = {
      ...data,
      identification: {
        ...data.identification,
        dateOfDeath: dayjs(data.identification.dateOfDeath).format(
          'DD/MM/YYYY',
        ),
        dateOfBirth: dayjs(data.identification.dateOfBirth).format(
          'DD/MM/YYYY',
        ),
        hourOfDeath: dayjs(data.identification.hourOfDeath).format('HH:mm'),
      },
      conditions: {
        ...data.conditions,
        evolutionTime1: `${data.conditions.evolutionTime1} ${data.conditions.timeUnit1.toLowerCase()}`,
        evolutionTime2:
          data.conditions.evolutionTime2 && data.conditions.timeUnit2
            ? `${data.conditions.evolutionTime2} ${data.conditions.timeUnit2.toLowerCase()}`
            : undefined,
        evolutionTime3:
          data.conditions.evolutionTime3 && data.conditions.timeUnit3
            ? `${data.conditions.evolutionTime3} ${data.conditions.timeUnit3.toLowerCase()}`
            : undefined,
        evolutionTime4:
          data.conditions.evolutionTime4 && data.conditions.timeUnit4
            ? `${data.conditions.evolutionTime4} ${data.conditions.timeUnit4.toLowerCase()}`
            : undefined,
        evolutionTime5:
          data.conditions.evolutionTime5 && data.conditions.timeUnit5
            ? `${data.conditions.evolutionTime5} ${data.conditions.timeUnit5.toLowerCase()}`
            : undefined,
      },
    };
    const flatObject = flattenObject(formattedData);
    console.log(flatObject);
    cert.pdf(flatObject);
  };

  const onError = () => {
    toast.error(
      'Há erros no formulário! Verifique os campos e tente novamente.',
    );
    console.log(methods.formState.errors);
  };

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabUp = () => {
    if (activeTab + 1 === 2 && infantDisabled)
      return setActiveTab((prev) => prev + 2);
    return activeTab === 6 ? null : setActiveTab((prev) => prev + 1);
  };

  const tabDown = () => {
    if (activeTab - 1 === 2 && infantDisabled)
      return setActiveTab((prev) => prev - 2);
    return activeTab === 0 ? null : setActiveTab((prev) => prev - 1);
  };

  return (
    <Box className="w-full min-h-screen">
      <ToastContainer />
      <div className="w-full flex flex-row items-center justify-between p-4 border-b">
        <h1 className="font-bold text-xl">D.O. Eletrônica</h1>
        <ThemeSwitcher />
      </div>
      <div className="w-10/12 mx-auto flex flex-col items-center gap-6 py-6">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
          >
            <Stack
              direction="row"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              className="w-full justify-between mb-6"
            >
              <Button
                onClick={tabDown}
                disabled={activeTab === 0}
                variant="text"
              >
                <NavigateBeforeIcon />
              </Button>
              <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Identificação" value={0} />
                <Tab label="Ocorrência" value={1} />
                <Tab label="Infantil" value={2} disabled={infantDisabled} />
                <Tab label="Condições e causas" value={3} />
                <Tab label="Médico" value={4} />
                <Tab label="Causas externas" value={5} />
                {
                  //<Tab label="Feedback" value={6} />
                }
              </Tabs>
              <Button onClick={tabUp} disabled={activeTab === 6} variant="text">
                <NavigateNextIcon />
              </Button>
            </Stack>
            <Identification index={0} value={activeTab} />
            <Occurrence index={1} value={activeTab} />
            <Infant index={2} value={activeTab} isEnabled={!infantDisabled} />
            <Conditions index={3} value={activeTab} />
            <Doctor index={4} value={activeTab} />
            <External index={5} value={activeTab} />
            <Feedback index={6} value={activeTab} />
            <Tooltip title="Gerar D.O." placement="top">
              <Button
                type="button"
                className="aspect-square !rounded-full"
                variant="contained"
                size="large"
                sx={{ position: 'fixed', bottom: 64, right: 64 }}
                onClick={methods.handleSubmit(onSubmit, onError)}
              >
                <FileOpen />
              </Button>
            </Tooltip>
          </form>
        </FormProvider>
      </div>
    </Box>
  );
}

export default App;
