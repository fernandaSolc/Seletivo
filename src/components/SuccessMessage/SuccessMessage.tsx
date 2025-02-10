import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import eiCheck from '../../assets/ei_check.png'; // Adjust the path as necessary

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow: '0px 4px 31.1px 5px rgba(0, 0, 0, 0.2)',
  borderRadius: '15px',
  backgroundColor: theme.palette.background.default,
}));

const SuccessMessageContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SuccessMessage() {
  const navigate = useNavigate();

  const handleNextStep = () => {
    navigate('/*');
  };

  return (
    <SuccessMessageContainer display="flex" direction="row" justifyContent="center">
      <CssBaseline />
      <Card>
      <img src={eiCheck} alt="Check" style={{ width: '50px' }} />
      <p>Muito bem! Agora que já conferimos tudo estamos preparados para começar sua inscrição!</p>
      <p>Você está perto de fazer parte do nosso Projeto. Basta clicar em avançar para prosseguir pro próximo passo!</p>
      <Button onClick={handleNextStep} fullWidth variant="contained" color="primary">
        Avançar
      </Button>
      </Card>
    </SuccessMessageContainer>
  );
}
