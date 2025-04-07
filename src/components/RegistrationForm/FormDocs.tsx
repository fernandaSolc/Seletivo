import { Box, Button, Typography, IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
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

export default function FormDocs() {
  const [historyFile, setHistoryFile] = useState<File | null>(null);
  const [rgFiles, setRgFiles] = useState<FileList | null>(null);
  const [addressFile, setAddressFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const historyInputRef = useRef<HTMLInputElement>(null);
  const rgInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (historyFile) formData.append("history", historyFile);
    if (rgFiles) {
      Array.from(rgFiles).forEach((file) => {
        formData.append("rg", file);
      });
    }
    if (addressFile) formData.append("address", addressFile);

    setUploading(true);
    try {
      const res = await axios.post("/selective/enem", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Enviado com sucesso!");
    } catch (err) {
      alert("Erro ao enviar arquivos");
    } finally {
      setUploading(false);
    }
  };

  const FileUploadBox = ({
    label,
    inputRef,
    onClick,
    fileName,
    onDelete,
    multiple,
    accept,
  }: {
    label: string;
    inputRef: React.RefObject<HTMLInputElement>;
    onClick: () => void;
    fileName?: string;
    onDelete: () => void;
    multiple?: boolean;
    accept?: string;
  }) => (
    <Box sx={{ mt: 2, width: 1,}}>
      <Typography variant="body1" fontWeight="bold">{label}</Typography>
      <Typography
          variant="body2"
          sx={{ mt: 0.5, mb: 0.5, ml: 2, fontSize: '0.7rem' }}>

          {label.includes("Histórico") && (
            <>
              Favor enviar apenas{" "}
              <span style={{ fontWeight: 'bold', color: '#8C44FF' }}>
                1 (um)
              </span>{" "}
              documento no formato PDF.
            </>
          )}
          {label.includes("Identidade") && (
            <>
              Favor enviar exatamente{" "}
              <span style={{ fontWeight: 'bold', color: '#8C44FF' }}>
                2 (dois)
              </span>{" "}
              imagens JPG (frente e verso).
            </>
          )}
          {label.includes("endereço") && (
            <>
              Favor enviar apenas{" "}
              <span style={{ fontWeight: 'bold', color: '#8C44FF' }}>
                1 (um)
              </span>{" "}
              comprovante de endereço no formato PDF.
            </>
          )}

      </Typography>



      
      <Box onClick={onClick} sx={{ cursor: 'pointer', border: '2px solid gray', borderRadius: '15px', padding: '15px', backgroundColor: '#e8e8e8', textAlign: 'center' }}>
        <ArrowUpwardIcon sx={{ color: 'gray' }} />
        <Typography variant="body2" color="gray">SELECIONAR ARQUIVO</Typography>
      </Box>
      <input
        type="file"
        hidden
        ref={inputRef}
        multiple={multiple}
        accept={accept}
        onChange={(e) => {
          const files = e.target.files;
          if (label.includes("Histórico")) {
            setHistoryFile(files?.[0] || null);
          } else if (label.includes("Identidade")) {
            if (files && files.length <= 2) {
              const allJpg = Array.from(files).every(file => file.type === "image/jpeg");
              if (!allJpg) {
                alert("Envie apenas imagens JPG.");
                e.target.value = ""; // limpa o input
                return;
              }
              setRgFiles(files);
            } else {
              alert("Envie exatamente 2 imagens JPG (frente e verso).");
              e.target.value = ""; // limpa o input
            }
          } else if (label.includes("endereço")) {
            setAddressFile(files?.[0] || null);
          }
        }}
      />
      {fileName && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" sx={{ flex: 1 }}>{fileName}</Typography>
          <IconButton onClick={onDelete}><DeleteIcon /></IconButton>
        </Box>
      )}
    </Box>
  );

  return (
    <CardContainer>
      <StepProgressBar step={4} totalSteps={4} />
      <Typography variant="h5" sx={{ fontWeight: '700', fontSize: '32px', mb: 3 }}>Documentos Necessários</Typography>

      <FileUploadBox
        label="Histórico escolar*"
        inputRef={historyInputRef}
        onClick={() => historyInputRef.current?.click()}
        fileName={historyFile?.name}
        onDelete={() => setHistoryFile(null)}
      />
      <FileUploadBox
        label="Documento de Identidade (frente e verso)*"
        inputRef={rgInputRef}
        onClick={() => rgInputRef.current?.click()}
        fileName={rgFiles ? Array.from(rgFiles).map(f => f.name).join(', ') : undefined}
        onDelete={() => setRgFiles(null)}
        multiple
        accept="image/jpeg"
      />
      <FileUploadBox
        label="Comprovante de endereço*"
        inputRef={addressInputRef}
        onClick={() => addressInputRef.current?.click()}
        fileName={addressFile?.name}
        onDelete={() => setAddressFile(null)}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 1, mt: 3 }}>
        <Button variant="outlined" sx={{ borderRadius: 2, width: '30%' }}>Voltar</Button>
        <Button
          variant="contained"
          sx={{ borderRadius: 2, width: '30%', backgroundColor: '#8C44FF' }}
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? "Enviando..." : "Finalizar"}
        </Button>
      </Box>
    </CardContainer>
  );
}
