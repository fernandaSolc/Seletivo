import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAsyncError, useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers/';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import LinearProgressWithLabel from "../ProgressBar/ProgressBar"

const CardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  margin: 'auto',
  maxWidth: '600px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '15px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
}));

export default function MeritScreen() {
  const navigate = useNavigate();
  const [schoolName, setSchoolName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [schoolcep, setSchoolCep] = useState('')
  const [schoolstreet, setSchoolStreet] = useState('')
  const [schoolnumber, setSchoolNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhoodschool, setNeighborhoodSchool] = useState('')
  const [schoolmedia, setSchoolMedia] = useState('')
  const [schoolcity, setSchoolCity] = useState('')
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode fazer validações ou salvar os dados, se necessário.
    navigate('/next-merit-step'); // Direciona para a próxima tela
  };

  return (
  <CardContainer sx={{padding:7, paddingTop:1}}>
    <LinearProgressWithLabel/>
      {/* Título */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1, fontFamily: 'Neue Machina, sans-serif' }}>
        Mérito
      </Typography>
      
      {/* Descrição */}
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        Entre com uma indicação por mérito acadêmico. Tudo que basta fazer é baixar o documento de mérito que disponibilizamos, pedir o carimbo e assinatura do(a) diretor(a) de sua escola, anexar o documento atualizado junto ao histórico escolar e completar os dados abaixo.
      </Typography>

      {/* Formulário */}
  <Box component="form" onSubmit={handleNext} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <Typography><strong>Nome da Escola</strong></Typography>
        <TextField
          fullWidth
          label="Nome da Escola"
          variant="outlined"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          required
          sx={{ marginTop: '5px' }}
        />
      </Grid>
      
      <Grid item xs={12}>
        <Typography><strong>Nome do(a) Diretor(a)</strong></Typography>
        <TextField
          fullWidth
          label="Nome do(a) Diretor(a)"
          variant="outlined"
          value={directorName}
          onChange={(e) => setDirectorName(e.target.value)}
          required
          sx={{ marginTop: '5px' }}
        />
      </Grid>
      
      <Grid item xs={12}>
        <Typography><strong>CEP da Escola</strong></Typography>
        <TextField
          fullWidth
          label="CEP da Escola"
          variant="outlined"
          value={schoolcep}
          onChange={(e) => setSchoolCep(e.target.value)}
          required
          sx={{ marginTop: '5px' }}
        />
      </Grid>
      
      <Grid item xs={12}>
      <Typography 
        sx={{marginBottom:'5px'}}><strong>Cidade da Escola</strong></Typography>
        <FormControl fullWidth>
          <TextField
          fullWidth
          label="Cidade da Escola"
          variant="outlined"
          value={schoolcity}
          onChange={(e) => setSchoolCity(e.target.value)}
          required
          sx={{ marginTop: '5px' }}
        />
        </FormControl>
      </Grid>
      
      <Grid item xs={12}>
        <Typography><strong>Rua da Escola</strong></Typography>
        <TextField
          fullWidth
          label="Rua da Escola"
          variant="outlined"
          value={schoolstreet}
          onChange={(e) => setSchoolStreet(e.target.value)}
          required
          sx={{ marginTop: '5px' }}
        />
      </Grid>
      
      <Grid item xs={12}>
        <Typography><strong>Bairro da Escola</strong></Typography>
        <TextField
          fullWidth
          label="Bairro da Escola"
          variant="outlined"
          value={neighborhoodschool}
          onChange={(e) => setNeighborhoodSchool(e.target.value)}
          required
          sx={{ marginTop: '5px' }}
        />
      </Grid>

        <Grid item xs={6}>
          <Typography><strong>Número da Escola</strong></Typography>
          <TextField
            fullWidth
            label="Número da Escola"
            variant="outlined"
            value={schoolnumber}
            onChange={(e) => setSchoolNumber(e.target.value)}
            required
            sx={{ marginTop: '5px' }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography><strong>Complemento</strong></Typography>
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
      
      <Grid item xs={12}>
        <Typography><strong>Nota Média no Ensino Médio</strong></Typography>
        <TextField
          fullWidth
          label="Nota Média no Ensino Médio"
          variant="outlined"
          value={schoolmedia}
          onChange={(e) => setSchoolMedia(e.target.value)}
          required
          sx={{ marginTop: '5px' }}
        />
      </Grid>
      
      <Grid item xs={5}>
      <Typography><strong>Data de Emissão</strong></Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}> 
          <DatePicker
            label="Data de Emissão"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            sx={{marginTop:'5px'}}
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                placeholder: dayjs().format("DD/MM/YYYY"),
              },
            }}
          />
        </LocalizationProvider>
      </Grid>
    {/* Botões de navegação */}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, alignItems:'center', justifyContent: 'center'}}>
      <Link 
        href="/download-merit-document" 
        target="_blank" 
        underline="hover" 
        sx={{ color: '#8C44FF', fontWeight: 'bold', width:1 }}
      >
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ backgroundColor: '#8C44FF', color: '#fff', textTransform: 'none', width: 1}}
        >
          GERAR DOCUMENTO
        </Button>
      </Link>
    </Box>
  </Box>

    </CardContainer>
  );
}