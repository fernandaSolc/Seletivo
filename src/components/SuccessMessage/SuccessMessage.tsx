import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import eiCheck from '../../assets/ei_check.png'; // Adjust the path as necessary


const Card = styled('div')(({ theme }) => ({
  padding: "0px 50px 10px 50px",
  margin: 'auto',
  maxWidth: '600px',
  height: '50vh',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px 10px 10px 16px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  gap:2,
  fontFamily:'Montserrat, sans-serif',

  // Scrollbar (WebKit)
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundcolor: theme.palette.text.primary,
    boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
    borderRadius: '0px 10px 10px 10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#D9D9D9',
    borderRadius: '16px 50px 50px 16px',
  },
  '&::-webkit-scrollbar-button': {
    display: 'none', 
  },
})); 

const SuccessMessageContainer = styled(Stack)(({ theme }) => ({
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
     <Card sx={{'& strong': {color: '#8C44FF'}}}>
      <SuccessMessageContainer display="flex" gap={2} justifyContent="center">
        <CssBaseline />
        <Box sx={{display:'flex', flexDirection:"row", justifyContent:'center'}}>
          <img src={eiCheck} alt="Check" style={{ width: '50px' }} />
        </Box>
        <p>Muito bem! Agora que já conferimos tudo estamos preparados para começar sua inscrição!</p>        
        <p>Você está perto de fazer parte do nosso Projeto. Basta clicar em <strong>avançar </strong> para prosseguir pro próximo passo!</p>
        <Button onClick={handleNextStep} fullWidth variant="contained" color="primary">
          Avançar
        </Button>
      </SuccessMessageContainer>
    </Card>
  );
}
