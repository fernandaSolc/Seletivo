import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import StepProgressBar from "../ProgressBar/ProgressBar";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const CardContainer = styled('div')(({ theme }) => ({
  padding: "0px 50px 10px 50px",
  margin: 'auto',
  maxWidth: '600px',
  height: '80vh',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px 10px 10px 16px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
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
    display: 'none', // Deve funcionar para remover as setas
   
  },
}));  

export default function FormPersonal() {
  const [nameresponsible, setNameResponsible] = useState('');
  const [emailresponsible, setEmailResponsible] = useState('');
  const [telefone, setTelefone] = useState('+55');
  const [parentheses, setParentheses] = useState('');

  // Estados de erro (opcional)
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');

  // Função para tratar o campo de telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('+55')) {
      value = '+55' + value.replace(/^\+?55?/, '');
    }

    // Validação simples (pode ser mais robusta, se quiser)
    if (value.length < 12) {
      setPhoneError(true);
      setPhoneErrorMessage('O número de telefone deve começar com +55 e ter pelo menos 12 dígitos.');
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }

    setTelefone(value);
  };

  return (
    <CardContainer sx={{ paddingTop: 1 }}>
      <StepProgressBar
        step={2}
        totalSteps={4}
        progressSx={{ backgroundColor: '', '& .MuiLinearProgress-bar': { backgroundColor: '#8C44FF' } }}
      />

      <Typography
        variant="h5"
        sx={{
          fontWeight: '700',
          fontFamily: 'Montserrat, Arial',
          fontSize: '32px',
          marginBottom: 3,
        }}>
        Matrícula Responsável
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }}><strong>Nome do Responsável</strong></Typography>
          <TextField
            fullWidth
            label="Nome do Responsável"
            variant="outlined"
            value={nameresponsible}
            onChange={(e) => setNameResponsible(e.target.value)}
            required
            sx={{ marginTop: '5px' }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }}><strong>Email do Responsável</strong></Typography>
          <TextField
            fullWidth
            label="Email do Responsável"
            variant="outlined"
            value={emailresponsible}
            onChange={(e) => setEmailResponsible(e.target.value)}
            required
            sx={{ marginTop: '5px' }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
          <Typography sx={{ mb: 1 }}><strong>Telefone do Responsável</strong></Typography>
            <TextField
              required
              fullWidth
              id="telefone"
              placeholder="Ex: +55 DDD e número"
              name="telefone"
              autoComplete="tel"
              value={telefone}
              onChange={handlePhoneChange}
              error={phoneError}
              helperText={phoneErrorMessage}
              size="small"
              sx={{ marginTop: '5px' }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Relação Parental</strong></Typography>
          <TextField
            fullWidth
            label="Qual sua relação com o Responsável?"
            variant="outlined"
            value={parentheses}
            onChange={(e) => setParentheses(e.target.value)}
            required
            sx={{ marginTop: '5px' }}
          />
        </Grid>
      </Grid>

      <Box sx={{
        pt: '10px',
        width: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
      }}>
        <Button fullWidth variant="outlined" sx={{ borderRadius: '5px', width: 0.2, backgroundColor: '#fff', mt: '15px' }}>
          Voltar
        </Button>
        <Button fullWidth variant="contained" sx={{ borderRadius: '5px', width: 0.2, backgroundColor: '#8C44FF', mt: '15px' }}>
          Próximo
        </Button>
      </Box>
    </CardContainer>
  );
}
