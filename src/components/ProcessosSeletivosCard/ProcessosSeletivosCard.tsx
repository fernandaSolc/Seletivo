// ProcessosSeletivosCard.tsx
import React from 'react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const CardContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  margin: 'auto',
  maxWidth: '600px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '15px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const Description = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderColor: '#8C44FF',
  color: '#8C44FF',
  textTransform: 'none',
  borderWidth: 2,
  marginBottom: theme.spacing(2),
  '&:hover': {
    borderColor: '#7A3CE0',
    backgroundColor: 'transparent',
  },
}));

const tooltipContent = (
  <Box>
    <Typography variant="body2" gutterBottom>
      <strong>ENEM:</strong> Utilize sua nota do ENEM para ingressar no Projeto Desenvolve. Por esse método, você precisará do documento oficial com suas notas do ENEM.
    </Typography>
    <Typography variant="body2" gutterBottom>
      <strong>Prova:</strong> Agende uma data, hora e local para uma prova presencial.
    </Typography>
    <Typography variant="body2">
      <strong>Mérito:</strong> Entre com uma indicação por mérito acadêmico. Enviaremos um documento que deverá conter o carimbo e assinatura do(a) diretor(a) de sua escola.
    </Typography>
  </Box>
);

export default function ProcessosSeletivosCard() {
  return (
    <CardContainer>

      <Title variant="h5">
        Escolha o método para ingressar no Projeto Desenvolver que mais lhe agradar.
      </Title>

      <Description variant="body1">
        Lembrando que, caso não seja aceito pelo método escolhido, outro método pode ser selecionado!
      </Description>
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'end', marginBottom: 2 }}>
        <Tooltip title={tooltipContent} placement="left" arrow>
          <IconButton size="small">
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Box display="flex" flexDirection="column">
        <StyledButton onClick={() => window.location.href='/enem-upload'} variant="outlined">ENEM</StyledButton>
        <StyledButton onClick={() => window.location.href='/outra-pagina'} variant="outlined">Mérito</StyledButton>
        <StyledButton onClick={() => window.location.href='/outra-pagina'} variant="outlined">Prova</StyledButton>
      </Box>
    </CardContainer>
  );
}