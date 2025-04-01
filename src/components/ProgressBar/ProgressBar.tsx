import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel({ step, totalSteps }: { step: number; totalSteps: number }) {
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
          '& .MuiLinearProgress-bar': { backgroundColor: '#8C44FF' },
          display: 'block',
        }}
      />
    </Box>
  );
}

export default function StepProgressBar() {
  const [step] = React.useState(5);
  const totalSteps = 5;

  return (
    <Box sx={{ width: '50%', textAlign: 'left', mt: 3, mx: 0, paddingBottom:'15px' }}>
      {/* Barra de Progresso */}
      <LinearProgressWithLabel step={step} totalSteps={totalSteps} />
    </Box>
  );
}
