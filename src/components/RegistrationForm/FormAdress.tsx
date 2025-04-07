import { Box, Button, CardContent, Grid, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import StepProgressBar from "../ProgressBar/ProgressBar";

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
    height: 0,
    width: 0,
  },
}));  


export default function FormAdress() {
  const [cep, setCep] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')

    return(
    <CardContainer sx={{paddingTop:1}}>
        <StepProgressBar 
        step={1} 
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
                Matrícula
        </Typography>
    <Grid container spacing={2} >
        <Grid item xs={12}>
            <Typography sx={{mb:1}} ><strong>CEP da sua residência</strong></Typography>
            <TextField
            fullWidth
            label="CEP da sua residência"
            variant="outlined"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
            sx={{ marginTop: '5px' }}
            />
      </Grid>
      <Grid item xs={12}>
            <Typography sx={{mb:1}} ><strong>Cidade</strong></Typography>
            <TextField
            fullWidth
            label="Informe seu município"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            sx={{ marginTop: '5px' }}
            />
      </Grid>
      <Grid item xs={12}>
            <Typography sx={{mb:1}} ><strong>Rua</strong></Typography>
            <TextField
            fullWidth
            label="Informe sua Rua"
            variant="outlined"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            sx={{ marginTop: '5px' }}
            />
      </Grid>
      <Grid item xs={12}>
            <Typography sx={{mb:1}} ><strong>Bairro</strong></Typography>
            <TextField
            fullWidth
            label="Informe seu bairro"
            variant="outlined"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            required
            sx={{ marginTop: '5px' }}
            />
      </Grid>
      <Grid item xs={6}>
            <Typography sx={{mb:1}} ><strong>Número</strong></Typography>
            <TextField
            fullWidth
            label="Número da residência"
            variant="outlined"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            sx={{ marginTop: '5px' }}
            />
      </Grid>
      <Grid item xs={6}>
            <Typography sx={{mb:1}} ><strong>Complemento</strong></Typography>
            <TextField
            fullWidth
            label="Complemento"
            variant="outlined"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            sx={{ marginTop: '5px' }}
            />
      </Grid>
      
      
    </Grid>
    <Box sx={{
        pt:'10px',
        width:1,
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'end',
    }}>
        <Button type="submit" fullWidth variant="contained" sx={{ borderRadius: '5px', width:0.2, backgroundColor: '#8C44FF', mt:'15px', '&:hover': { backgroundColor: '#7A3CE0' } }}>
            Próximo
        </Button>
    </Box>
    </CardContainer>
    );
}

