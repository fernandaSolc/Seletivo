import React, { useState } from 'react';
import { Box, Button, Typography, Link, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const CardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  margin: 'auto',
  maxWidth: '600px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '15px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
  color: theme.palette.text.primary,
}));

export default function EnemUploadScreen() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setErrorMessage("Por favor, selecione um arquivo.");
      return;
    }
    setErrorMessage(null);
    setResultMessage(null);
    setUploading(true);
    const formData = new FormData();
    formData.append("enemDocument", file);

    try {
      const response = await axios.post("/selective/enem", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setResultMessage(`Resultado: ${response.data.result}`);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 415) {
        setErrorMessage("Tipo de documento não suportado.");
      } else {
        setErrorMessage("Erro ao enviar o documento. Tente novamente.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <CardContainer>
      {/* Título */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        ENEM
      </Typography>
      
      {/* Descrição */}
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Através desse método você utilizará da sua nota do ENEM para ingressar no Projeto Desenvolve. Anexe abaixo o documento oficial com sua nota que o sistema validará todas elas.
      </Typography>
      
      {/* Aviso com link */}
      <Typography variant="body2" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        Não sabe como pegar o documento oficial com suas notas?{' '}
        <Link 
          href="https://exemplo.com/tutorial-enem" 
          target="_blank" 
          underline="hover" 
          sx={{ color: '#8C44FF', fontWeight: 'bold' }}
        >
          Clique aqui
        </Link>{' '}
        para ver um vídeo te mostrando um tutorial simples.
      </Typography>
      
      {/* Formulário de upload */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button variant="outlined" component="label" sx={{ borderColor: '#8C44FF', color: '#8C44FF' }}>
          Selecionar arquivo
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        {file && (
          <Typography variant="body2">Arquivo selecionado: {file.name}</Typography>
        )}
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ backgroundColor: '#8C44FF', color: '#fff', textTransform: 'none' }} 
          disabled={uploading}
        >
          {uploading ? "Enviando..." : "Enviar"}
        </Button>
        <Button 
          variant="outlined" 
          sx={{ borderColor: '#8C44FF', color: '#8C44FF', textTransform: 'none' }} 
          onClick={() => window.location.href='/processos-seletivos'}
        >
          Voltar
        </Button>
      </Box>
      
      {/* Mensagens de resultado ou erro */}
      {resultMessage && (
        <Alert severity="success" sx={{ marginTop: 2 }}>
          {resultMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </CardContainer>
  );
}