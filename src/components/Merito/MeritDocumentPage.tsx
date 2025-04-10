import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StepProgressBar from "../ProgressBar/ProgressBar";

const CardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: "auto",
  
  maxWidth: "600px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "15px",
  boxShadow: "0px 4px 31px rgba(0, 0, 0, 0.2)",
}));

export default function MeritUpload() {
  const [arquivo, setArquivo] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const handleUpload = (event: { target: { files: any[]; }; }) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setArquivo(file);
    } else {
      alert("Por favor, envie um arquivo PDF.");
    }
  };

  const handleEnviar = () => {
    if (!arquivo) {
      alert("Por favor, selecione um documento antes de enviar.");
      return;
    }
    setEnviado(true);
  };

  return (
    <CardContainer sx={{ padding: 7, paddingTop:1 }}>
      <StepProgressBar
          step={5}
          totalSteps={5}
          progressSx={{
            backgroundColor: "",
            "& .MuiLinearProgress-bar": { backgroundColor: "#8C44FF" },
          }}/>
          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "Montserrat, sans-serif", mb: 1, ml:2 }}>
            Mérito
          </Typography>

      {!enviado ? (
        <>
          <Typography sx={{ mb: 2 }}>
          <strong>Documento de mérito*</strong><br />
          <Typography  sx={{ mb: 1,ml: 4, fontSize:'12px', '& strong': { color: '#8C44FF' }, }}>Favor certificar que o documento apresenta carimbo e assinatura do(a) diretor(a) e enviar apenas <strong> 1 (um) </strong> documento no formato PDF.</Typography>
          </Typography>

          <Paper
            elevation={3}
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 3,
              padding: 4,
              textAlign: "center",
              mb: 3,
              cursor: "pointer",
            }}
            onClick={() => document.getElementById("upload-input").click()}
          >
            <CloudUploadIcon sx={{ fontSize: 40, color: "#999" }} />
            <Typography sx={{ mt: 1, color: "#999" }}>
              Arraste o arquivo ou clique para pegar do dispositivo
            </Typography>
            <input
              id="upload-input"
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
            {arquivo && (
              <Typography sx={{ mt: 1, color: "#555", fontWeight: "bold" }}>
                {arquivo.name}
              </Typography>
            )}
          </Paper>

          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#8C44FF", mb: 2 }}
            onClick={handleEnviar}
          >
            Enviar
          </Button>
          <Button fullWidth variant="outlined">Voltar</Button>
        </>
      ) : (
        <>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 4, backgroundColor: "#fff" }}>
            <Box display="flex" alignItems="flex-start" gap={2}>
              <CheckCircleIcon sx={{ color: "#8C44FF", fontSize: 32, mt: 0.5 }} />
              <Box>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                  Muito bem! Recebemos seu documento e um de nossos agentes irá analisá-lo nos próximos dias.
                </Typography>
                <Typography variant="body2">
                  Para acompanhar seu status basta voltar aqui que iremos te atualizar! Em caso de dúvida, entre em contato através de nosso canal de comunicação.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </>
      )}
    </CardContainer>
  );
}
