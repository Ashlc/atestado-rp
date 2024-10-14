import { Computer, DarkMode, LightMode } from '@mui/icons-material';
import { useColorScheme } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons() {
  const { mode, setMode } = useColorScheme();

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={(_event, newValue) =>
        setMode(newValue as 'system' | 'light' | 'dark')
      }
      aria-label="text alignment"
    >
      <ToggleButton value="system" aria-label="left aligned">
        <Computer />
      </ToggleButton>
      <ToggleButton value="light" aria-label="centered">
        <LightMode />
      </ToggleButton>
      <ToggleButton value="dark" aria-label="right aligned">
        <DarkMode />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
