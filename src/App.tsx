import { FileOpen } from '@mui/icons-material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import dayjs from 'dayjs';
import { SyntheticEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Conditions from './pages/Conditions/Conditions';
import Doctor from './pages/Doctor/Doctor';
import External from './pages/External/External';
import Identification from './pages/Identification/Identification';
import Infant from './pages/Infant/Infant';
import Locality from './pages/Locality/Locality';
import Occurence from './pages/Occurence/Occurence';
import Certificate from './utils/certificate';

function App() {
  const cert = new Certificate(null);
  cert.pdf();

  const [activeTab, setActiveTab] = useState(2);
  const methods = useForm();
  const [birth, death] = methods.watch(['dateOfBirth', 'dateOfDeath']);
  const typeOfDeath = methods.watch('typeOfDeath');
  const infantDisabled =
    (typeOfDeath && typeOfDeath === 'fetal') ||
    (birth && death && dayjs(death).diff(dayjs(birth), 'year') <= 1);

  const onSubmit = (data) => console.log(data);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
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
    <div className="w-full min-h-screen">
      <div className="w-10/12 lg:w-2/3 mx-auto flex flex-col items-center gap-6 py-6">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
          >
            <Box
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              className="w-full"
            >
              <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Identificação" value={0} />
                <Tab label="Ocorrência" value={1} />
                <Tab label="Infantil" value={2} disabled={infantDisabled} />
                <Tab label="Condições e causas" value={3} />
                <Tab label="Médico" value={4} />
                <Tab label="Causas externas" value={5} />
                <Tab label="Localidade s/ Médico" value={6} />
              </Tabs>
            </Box>
            <Identification index={0} value={activeTab} />
            <Occurence index={1} value={activeTab} />
            <Infant index={2} value={activeTab} />
            <Conditions index={3} value={activeTab} />
            <Doctor index={4} value={activeTab} />
            <External index={5} value={activeTab} />
            <Locality index={6} value={activeTab} />
          </form>
          <Stack
            direction={'row'}
            spacing={2}
            className="w-full justify-between"
          >
            <Button
              onClick={methods.handleSubmit(onSubmit)}
              variant="contained"
              startIcon={<FileOpen />}
            >
              Gerar D.O.
            </Button>
            <Stack direction={'row'} spacing={2}>
              <Button
                onClick={tabDown}
                disabled={activeTab === 0}
                variant="contained"
                startIcon={<NavigateBeforeIcon />}
              >
                Voltar
              </Button>
              <Button
                onClick={tabUp}
                disabled={activeTab === 6}
                variant="contained"
                endIcon={<NavigateNextIcon />}
              >
                Avançar
              </Button>
            </Stack>
          </Stack>
        </FormProvider>
      </div>
    </div>
  );
}

export default App;
