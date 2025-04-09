import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import StepProgressBar from "../ProgressBar/ProgressBar";
import { styled } from '@mui/material/styles';

const CardContainer = styled('div')(({ theme }) => ({
  padding: "10px 30px 40px 40px",
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
    display: 'none', 
   
  },
}));  

export default function EnemGradeVerificationPage() {
  const [scores, setScores] = React.useState({
    linguagem: "",
    humanas: "",
    natureza: "",
    matematica: "",
    redacao: "",
  });

  const [errors, setErrors] = React.useState({
    linguagem: "",
    humanas: "",
    natureza: "",
    matematica: "",
    redacao: "",
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, ""); // permite apenas números
    setScores({ ...scores, [field]: value });
  };

  const validateScores = () => {
    const newErrors: any = {};
    let isValid = true;

    Object.entries(scores).forEach(([key, value]) => {
      const num = Number(value);
      if (!value) {
        newErrors[key] = "Campo obrigatório.";
        isValid = false;
      } else if (isNaN(num) || num < 0 || num > 1000) {
        newErrors[key] = "Nota inválida (0 a 1000).";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateScores()) {
      console.log("Notas enviadas:", scores);
      // Aqui você pode chamar a API ou ir para o próximo passo
    }
  };

  return (
    <>
    <CardContainer sx={{ mt: 4 }}>
        <StepProgressBar
        step={5} 
        totalSteps={5} 
        progressSx={{ backgroundColor: '', '& .MuiLinearProgress-bar': { backgroundColor: '#8C44FF' } }}
        />
    
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          ENEM
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, pr:15 }}>
          Verifique se todas as suas notas, nas respectivas áreas de conhecimento, estão corretas.
        </Typography>

        <Box component="form" sx={{width: 1}} onSubmit={handleSubmit}>
          <Typography><strong>Linguagem, Códigos e suas Tecnologias</strong></Typography>
            <TextField
              fullWidth
              label="Exemplo: 650"
              value={scores.linguagem}
              onChange={handleChange("linguagem")}
              error={!!errors.linguagem}
              helperText={errors.linguagem}
              sx={{ mb: 2, mt:2 }}
            />

          <Typography><strong>Ciências Humanas e suas Tecnologias</strong></Typography>
            <TextField
              fullWidth
              label="Exemplo: 650"
              value={scores.humanas}
              onChange={handleChange("humanas")}
              error={!!errors.humanas}
              helperText={errors.humanas}
              sx={{ mb: 2 }}
            />
            
          <Typography><strong>Ciências Humanas e suas Tecnologias</strong></Typography>
            <TextField
              fullWidth
              label="Exemplo: 650"
              value={scores.natureza}
              onChange={handleChange("natureza")}
              error={!!errors.natureza}
              helperText={errors.natureza}
              sx={{ mb: 2 }}
            />
            
          <Typography><strong>Matemática e suas Tecnologias</strong></Typography>
            <TextField
              fullWidth
              label="Exemplo: 650"
              value={scores.matematica}
              onChange={handleChange("matematica")}
              error={!!errors.matematica}
              helperText={errors.matematica}
              sx={{ mb: 2 }}
            />
            
          <Typography><strong>Redação</strong></Typography>
            <TextField
              fullWidth
              label="Exemplo: 650"
              value={scores.redacao}
              onChange={handleChange("redacao")}
              error={!!errors.redacao}
              helperText={errors.redacao}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#8C44FF",
                color: "white",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                py: 1.5,
                mb: 2,
                "&:hover": {
                  backgroundColor: "#732ddc",
                },
              }}
            >
              Confirmar
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: "#8C44FF",
                color: "#8C44FF",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                py: 1.5,
                "&:hover": {
                  backgroundColor: "#f3e9ff",
                },
              }}
              onClick={() => {
                console.log("Voltar");
              }}
            >
              Voltar
            </Button>
        </Box>
    </CardContainer>
    </>
  );
}
