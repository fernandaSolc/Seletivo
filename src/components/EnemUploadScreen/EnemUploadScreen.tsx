import React, { useState } from 'react';
import { Box, Button, Typography, Link, Alert, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DescriptionIcon from '@mui/icons-material/Description'; // Icon for PDF files


const CardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  margin: 'auto',
  maxWidth: '600px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '15px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
  color: theme.palette.text.primary,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  borderColor: '#8C44FF',
  color: '#8C44FF',
  textTransform: 'none',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  '&:hover': {
    borderColor: '#6A36CC',
    color: '#6A36CC',
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8C44FF',
  color: '#fff',
  textTransform: 'none',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: '#6A36CC',
  },
}));

const ModalButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8C44FF',
  color: '#fff',
  textTransform: 'none',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#6A36CC',
  },
  '&.Mui-disabled': {
    backgroundColor: '#D3D3D3',
    color: '#fff',
  },
}));

const ClearButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#D3D3D3',
  color: '#fff',
  textTransform: 'none',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 'bold',
  borderRadius: '8px',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: '#B0B0B0',
  },
  '&.Mui-disabled': {
    backgroundColor: '#E0E0E0',
    color: '#fff',
  },
}));

export default function EnemUploadScreen() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      let error = null;

      // Validate file type (only allow PDFs)
      if (selectedFile.type !== 'application/pdf') {
        error = 'Apenas arquivos PDF são aceitos.';
      }
      // Validate file size (max 5 MB)
      else if (selectedFile.size > 5 * 1024 * 1024) { // 5 MB in bytes
        error = 'Arquivo muito grande. Tamanho máximo de arquivo é 5 MB.';
      }

      if (error) {
        setModalError(error);
        setFile(null);
      } else {
        setFile(selectedFile);
        setModalError(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setModalError(null); // Clear any error messages when removing the file
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setModalError(null);
    setFile(null); // Reset file when opening the modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalError(null);
    setFile(null);
  };

  const handleModalSubmit = () => {
    if (!file) {
      setModalError('Por favor, selecione um arquivo.');
      return;
    }
    setModalOpen(false); // Close the modal after selecting a file
  };

  const handleClear = () => {
    setFile(null);
    setModalError(null);
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
      <Typography
        variant="h5"
        sx={{
          fontWeight: '700',
          fontFamily: 'Montserrat, Arial',
          fontSize: '32px',
          marginBottom: 3,
        }}
      >
        ENEM
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          marginBottom: 2,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '15px',
          lineHeight: 1.5,
        }}
      >
        Através desse método você utilizará da sua nota do ENEM para ingressar no Projeto Desenvolve. Anexe abaixo o documento oficial com sua nota que o sistema validará todas elas.
      </Typography>

      {/* Tutorial Link */}
      <Typography
        variant="body2"
        sx={{
          marginBottom: 3,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '11px',
          fontWeight: 'bold',
          margin: 0
        }}
      >
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

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', marginTop:'15px'}}>
      <Box  onClick={handleModalOpen}    sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', border: '2px solid gray', borderRadius:'15px',width:0.8, padding: '15px', backgroundColor: '#e8e8e8'}}>
      <CustomButton 
        variant="contained" 
        onClick={handleModalOpen} 
        sx={{  
          background: 'lightgray', 
          color: 'GrayText'
        }}
      >
  <ArrowUpwardIcon />
</CustomButton>
<Typography 
  variant="body1" 
  color="gray" 
  sx={{ mt: 1, textAlign: 'center', color: 'gray' }}
>
  SELECIONAR ARQUIVO
</Typography>
</Box>
        {file && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', width: '300px', height:'40px', marginTop:'20px', marginLeft:'50px' }}>
              Arquivo selecionado: {file.name}
            </Typography>
            <IconButton  sx={{ color: '#8C44FF' }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        <SubmitButton type="submit" variant="contained" disabled={uploading} sx={{width: "75%"}}>
          {uploading ? "Enviando..." : "ENVIAR"}
        </SubmitButton>
        <CustomButton
          variant="outlined"
          onClick={() => window.location.href = '/processos-seletivos'}
          sx={{width: "75%"}}
        >
          VOLTAR
        </CustomButton>
      </Box>

      {/* Modal for File Upload */}
      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold'}}>
            {modalError ? '1 erro' : file ? '1 arquivo anexado' : 'Arquivo com upload'}
          </Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 , alignItems: 'center'}}>
            <Button variant="outlined" component="label" sx={{ borderColor: '#8C44FF', color: '#8C44FF', borderRadius:'7px', width: 0.4 }}>
              Upload
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {(file || modalError) && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: 1, backgroundColor: 'lightgrey', borderRadius: '4px', }}>
                <DescriptionIcon sx={{ color: '#8C44FF' }} />
                <Box sx={{ flexGrow: 1, }}>
                  <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif', gap:0.5 }}>
                    {file ? file.name : modalError ? 'Arquivo inválido' : ''}
                  </Typography>
                  {modalError && (
                    <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif', color: 'red', fontSize: '12px' }}>
                      {modalError}
                    </Typography>
                  )}
                </Box>
                <IconButton onClick={handleRemoveFile} sx={{ color: '#8C44FF' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <ClearButton onClick={handleClear} disabled={!file && !modalError}>
            Limpar
          </ClearButton>
          <ModalButton onClick={handleModalSubmit} disabled={!file || !!modalError}>
            Enviar
          </ModalButton>
        </DialogActions>
      </Dialog>

      {/* Result or Error Messages */}
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