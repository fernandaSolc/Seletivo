import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aqui você pode fazer validações ou salvar os dados, se necessário.
    navigate('/next-merit-step'); // Direciona para a próxima tela
  };

  return (
    <CardContainer>
      {/* Título */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Mérito
      </Typography>
      
      {/* Descrição */}
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Entre com uma indicação por mérito acadêmico. Tudo que basta fazer é baixar o documento de mérito que disponibilizamos, pedir o carimbo e assinatura do(a) diretor(a) de sua escola, anexar o documento atualizado junto ao histórico escolar e completar os dados abaixo.
      </Typography>
      
      {/* Aviso com link */}
      <Typography variant="body2" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        <Link 
          href="/download-merit-document" 
          target="_blank" 
          underline="hover" 
          sx={{ color: '#8C44FF', fontWeight: 'bold' }}
        >
          CLIQUE AQUI PARA BAIXAR O DOCUMENTO
        </Link>
      </Typography>
      
      {/* Formulário */}
      <Box component="form" onSubmit={handleNext} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nome da Escola"
          variant="outlined"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          required
        />
        <TextField
          label="Nome do(a) Diretor(a)"
          variant="outlined"
          value={directorName}
          onChange={(e) => setDirectorName(e.target.value)}
          required
        />
        
        {/* Botões de navegação */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
          <Button 
            variant="outlined" 
            sx={{ borderColor: '#8C44FF', color: '#8C44FF', textTransform: 'none' }} 
            onClick={() => window.location.href='/processos-seletivos'}
          >
            Voltar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            sx={{ backgroundColor: '#8C44FF', color: '#fff', textTransform: 'none' }}
          >
            Avançar
          </Button>
        </Box>
      </Box>
    </CardContainer>
  );
}