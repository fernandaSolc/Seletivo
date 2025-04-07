import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface LinearProgressWithLabelProps {
  step: number;
  totalSteps: number;
  progressSx?: object; // Permite passar estilos personalizados
}

function LinearProgressWithLabel({ step, totalSteps, progressSx }: LinearProgressWithLabelProps) {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Label acima da barra, alinhada à esquerda */}
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, textAlign: 'left' }}>
        {`${step}/${totalSteps}`}
      </Typography>

      {/* Barra de progresso personalizada */}
      <LinearProgress
        variant="determinate"
        value={(step / totalSteps) * 100}
        sx={{
          height: 5,
          borderRadius: '55px',
          bgcolor: '#E0E0E0',
          display: 'block',
          ...progressSx, // Permite estilização dinâmica
        }}
      />
    </Box>
  );
}

interface StepProgressBarProps {
  step: number;
  totalSteps: number;
  progressSx?: object;
}

export default function StepProgressBar({ step, totalSteps, progressSx }: StepProgressBarProps) {
  return (
    <Box sx={{ width: '50%', textAlign: 'left', mt: 3, mx: 0, paddingBottom: '15px' }}>
      {/* Barra de Progresso */}
      <LinearProgressWithLabel step={step} totalSteps={totalSteps} progressSx={progressSx} />
    </Box>
  );
}