import React, { useState } from 'react';
import {
  Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import StepProgressBar from '../ProgressBar/ProgressBar';

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
    height: 0,
    width: 0,
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'lightgray',
  color: 'gray',
  borderRadius: '8px',
  padding: theme.spacing(1),
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#d6d6d6'
  }
}));

const ClearButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#D3D3D3',
  color: '#fff',
  textTransform: 'none',
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

const ModalButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8C44FF',
  color: '#fff',
  textTransform: 'none',
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

// Labels de cada documento
const fileLabels = {
  historico: 'Histórico escolar*',
  identidade: 'Documento de identidade (frente e verso)*',
  comprovante: 'Comprovante de endereço*'
};

export default function PaginaUploadMatricula() {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    historico: null,
    identidade: null,
    comprovante: null, 
  });

  const [currentField, setCurrentField] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleModalOpen = (field: string) => {
    setCurrentField(field);
    setModalError(null);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalError(null);
  };

  const handleModalSubmit = () => {
    if (!currentField || !files[currentField]) {
      setModalError('Por favor, selecione um arquivo.');
      return;
    }
    setModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentField) return;
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setModalError('Apenas arquivos PDF são aceitos.');
    } else if (selectedFile.size > 5 * 1024 * 1024) {
      setModalError('Arquivo muito grande. Tamanho máximo de 5 MB.');
    } else {
      setFiles((prev) => ({ ...prev, [currentField]: selectedFile }));
      setModalError(null);
    }
  };

  const handleRemoveFile = (field: string) => {
    setFiles((prev) => ({ ...prev, [field]: null }));
    setModalError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasMissing = Object.values(files).some(f => !f);
    if (hasMissing) {
      setErrorMessage("Por favor, envie todos os documentos obrigatórios.");
      return;
    }
    setResultMessage("Documentos enviados com sucesso!");
    setErrorMessage(null);
  };

  const renderUploadBox = (field: string) => (
    <Box key={field} sx={{ width: '100%' }}>
      <Typography variant="body1"  sx={{ mt: 3,fontWeight: 'bold'}}>{fileLabels[field]}</Typography>
      <Typography  sx={{ mb: 1,ml: 4, fontSize:'12px', '& strong': { color: '#8C44FF' }, }}>Favor enviar apenas <strong> 1 (um) </strong> documento no formato PDF.</Typography>

      <Box onClick={() => handleModalOpen(field)} sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px dashed gray',
        borderRadius: '15px',
        padding: '25px',
        backgroundColor: '#f8f8f8',
      }}>
        <CustomButton>
          <ArrowUpwardIcon />
        </CustomButton>
        <Typography variant="body2" sx={{ color: 'gray', mt: 1 }}>
          Arraste o arquivo ou clique para pegar do dispositivo
        </Typography>
      </Box>

      {files[field] && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <DescriptionIcon sx={{ color: '#8C44FF' }} />
          <Typography variant="body2">{files[field]?.name}</Typography>
          <IconButton onClick={() => handleRemoveFile(field)} sx={{ color: '#8C44FF' }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );

  return (
    <CardContainer>
      <StepProgressBar
        step={4}
        totalSteps={4}
        progressSx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#8C44FF' } }}
      />

      <Typography sx={{ fontSize: '28px', fontWeight: 'bold', fontFamily: 'monospace' }}>
        Matrícula
      </Typography>

      {Object.keys(fileLabels).map(renderUploadBox)}

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
        <Button fullWidth variant="contained"onClick={handleSubmit} sx={{ borderRadius: '5px', width: 0.2, backgroundColor: '#8C44FF', mt: '15px' }}>
          Próximo
        </Button>
      </Box>

      {resultMessage && <Alert severity="success" sx={{ mt: 2 }}>{resultMessage}</Alert>}
      {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}

      <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {modalError ? '1 erro' : currentField && files[currentField] ? '1 arquivo anexado' : 'Upload de arquivo'}
          </Typography>
          <IconButton onClick={handleModalClose}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <Button variant="outlined" component="label" sx={{ borderColor: '#8C44FF', color: '#8C44FF', borderRadius: '7px', width: '40%' }}>
              Upload
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            {(files[currentField ?? ''] || modalError) && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, padding: 1, backgroundColor: 'lightgrey', borderRadius: '4px' }}>
                <DescriptionIcon sx={{ color: '#8C44FF' }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">{files[currentField ?? '']?.name || 'Arquivo inválido'}</Typography>
                  {modalError && (
                    <Typography variant="body2" sx={{ color: 'red', fontSize: '12px' }}>{modalError}</Typography>
                  )}
                </Box>
                <IconButton onClick={() => handleRemoveFile(currentField!)} sx={{ color: '#8C44FF' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <ClearButton onClick={() => currentField && handleRemoveFile(currentField)} disabled={!files[currentField ?? ''] && !modalError}>
            Limpar
          </ClearButton>
          <ModalButton onClick={handleModalSubmit} disabled={!files[currentField ?? ''] || !!modalError}>
            Enviar
          </ModalButton>
        </DialogActions>
      </Dialog>
    </CardContainer>
  );
}
