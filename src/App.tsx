import { FileOpen } from '@mui/icons-material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { SyntheticEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Conditions from './pages/Conditions/Conditions';
import Doctor from './pages/Doctor/Doctor';
import External from './pages/External/External';
import Feedback from './pages/Feedback/Feedback';
import Identification from './pages/Identification/Identification';
import Infant from './pages/Infant/Infant';
import Occurence from './pages/Occurence/Occurence';
import { isInfant } from './utils/handleAge';
import Certificate from './utils/certificate';

function App() {
  const cert = new Certificate(null);
  const [activeTab, setActiveTab] = useState(0);
  const methods = useForm();
  const [birth, death] = methods.watch([
    'identification.dateOfBirth',
    'identification.dateOfDeath',
  ]);
  const typeOfDeath = methods.watch('identification.typeOfDeath');
  const infantDisabled =
    !(typeOfDeath && typeOfDeath === 'Fetal') && !isInfant(birth, death);

  const onSubmit = (data) => cert.pdf();

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
      <div className="w-10/12 mx-auto flex flex-col items-center gap-6 py-6">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center"
          >
            <Stack
              direction="row"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
              className="w-full justify-between"
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
                <Tab label="Feedback" value={6} />
              </Tabs>
              <Button onClick={tabUp} disabled={activeTab === 6} variant="text">
                <NavigateNextIcon />
              </Button>
            </Stack>
            <Identification index={0} value={activeTab} />
            <Occurence index={1} value={activeTab} />
            <Infant index={2} value={activeTab} />
            <Conditions index={3} value={activeTab} />
            <Doctor index={4} value={activeTab} />
            <External index={5} value={activeTab} />
            <Feedback index={6} value={activeTab} />
            {activeTab === 6 && (
              <Button
                type="submit"
                className="mt-4"
                variant="contained"
                size="large"
                endIcon={<FileOpen />}
              >
                Gerar D.O.
              </Button>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default App;
