import { useState } from "react";
import {
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import StepProgressBar from "../ProgressBar/ProgressBar";

const CardContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  margin: "auto",
  maxWidth: "600px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "15px",
  boxShadow: "0px 4px 31px rgba(0, 0, 0, 0.2)",
}));

const locaisDisponiveis = [
  "UaiTec (Av. Duque de Caxias, 1240 - Quatorze de Fevereiro, Itabira - MG, 35990-236)",
  "BOM DESPACHO",
];
const horariosDisponiveis = ["08:00", "10:00", "14:00", "16:00"];
const datasDisponiveis = ["10 de Abril de 2025","12 de Abril de 2025","15 de Abril de 2025",];

export default function ExamScreen() {
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const handleEnviar = () => {
    if (!local || !data || !horario) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setMostrarConfirmacao(true);
  };

  const handleReagendar = () => {
    setMostrarConfirmacao(false);
    setLocal("");
    setData("");
    setHorario("");
  };

  return (
    <CardContainer sx={{ padding: 7, paddingTop: 1 }}>
      <StepProgressBar
        step={5}
        totalSteps={5}
        progressSx={{
          backgroundColor: "",
          "& .MuiLinearProgress-bar": { backgroundColor: "#8C44FF" },
        }}
      />

      {!mostrarConfirmacao && (
        <>
          <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "Montserrat, sans-serif" }}>
            Prova
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Através desse método você vai marcar um local, data e horário de preferência para realização de uma prova presencial. Após isso, cheque se um ticket com o local e data da prova chegou em seu e-mail.
          </Typography>
        </>
      )}

      {!mostrarConfirmacao ? (
        <>
          <Typography sx={{ mb: 0.5 }}><strong>Local</strong></Typography>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel>Selecione um dos locais disponíveis</InputLabel>
            <Select label="Selecione um dos locais disponíveis" value={local} onChange={(e) => setLocal(e.target.value)}>
              {locaisDisponiveis.map((loc) => (
                <MenuItem key={loc} value={loc}>{loc}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography sx={{ mb: 0.5 }}><strong>Data:</strong></Typography>
          <FormControl fullWidth sx={{ mb: 1 }}>
            <InputLabel>Selecione uma das datas disponíveis</InputLabel>
            <Select label="Selecione uma das datas disponíveis" value={data} onChange={(e) => setData(e.target.value)}>
              {datasDisponiveis.map((dat) => (
                <MenuItem key={dat} value={dat}>{dat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography sx={{ mb: 1, mt: 2 }}><strong>Horário:</strong></Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Selecione o horário da Prova</InputLabel>
            <Select label="Selecione o horário da Prova" value={horario} onChange={(e) => setHorario(e.target.value)}>
              {horariosDisponiveis.map((hora) => (
                <MenuItem key={hora} value={hora}>{hora}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button fullWidth variant="contained" color="primary" sx={{ mb: 1 }} onClick={handleEnviar}>
            Enviar
          </Button>
          <Button fullWidth variant="text" color="primary">
            Voltar
          </Button>
        </>
      ) : (
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Confirmar Local de Prova
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Confirme se o local de prova marcado é o que melhor te atende e gere o documento com todas as informações necessárias.
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <strong>Local da prova:</strong> {local}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Data e Horário:</strong> {data} às {horario}
          </Typography>

          <Button fullWidth variant="contained" sx={{ backgroundColor: "#8C44FF", mt: 3, mb: 2 }}>
            Emitir Documento
          </Button>
          <Button fullWidth variant="outlined" onClick={handleReagendar}>
            Reagendar
          </Button>
        </Box>
      )}
    </CardContainer>
  );
}
