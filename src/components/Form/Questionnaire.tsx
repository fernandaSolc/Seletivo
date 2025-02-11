import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Card = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  margin: "auto",
  maxWidth: "600px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "15px",
  boxShadow: "0px 4px 31.1px 5px rgba(0, 0, 0, 0.2)",
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(-1.2), // Diminuir o espaçamento entre linhas
}));

// Array de perguntas com alternativas, pesos e pontuações
const questions = [
  {
    id: "q1",
    question: "Qual é a sua situação profissional atualmente?",
    weight: 2,
    alternatives: [
      { value:"1", label: "Trabalho" },
      { value:"2", label: "Estudo" },
      { value:"3", label: "Trabalho e estudo" },
      { value:"4", label: "Nem trabalho nem estudo" },
    ],
  },
  {
    id: "q2",
    question: "Possui experiência com Programação, TI e tecnologias afins?",
    weight: 1,
    alternatives: [
      { value:"1", label: "Nenhuma experiência" },
      { value:"2", label: "Conhecimentos básicos" },
      { value:"3", label: "Experiência intermediária" },
      { value:"4", label: "Experiência avançada" },
    ],
  },
  {
    id: "q3",
    question: "Quanto tempo de experiência na área da tecnologia você tem? (se aplicável)",
    weight: 1,
    alternatives: [
      { value:"1", label: "Menos de 1 ano" },
      { value:"2", label: "Entre 1 à 2 anos" },
      { value:"3", label: "Entre 2 à 4 anos" },
      { value:"4", label: "Mais de 5 anos" },
    ],
  },
  {
    id: "q4",
    question: "Qual seu nível de conhecimento em linguagem de programação?",
    weight: 1,
    alternatives: [
      { value:"1", label: "Nenhum" },
      { value:"2", label: "Básico" },
      { value:"3", label: "Intermediário" },
      { value:"4", label: "Avançado" },
    ],
  },
  {
    id: "q5",
    question: "Qual o nível de motivação que você julga ter em relação ao curso?",
    weight: 2,
    alternatives: [
      { value:"1", label: "Muito motivado" },
      { value:"2", label: "Motivado" },
      { value:"3", label: "Curioso" },
      { value:"4", label: "Indiferente" },
      { value:"5", label: "Pouco motivado" },
    ],
  },
  {
    id: "q6",
    question: "O Projeto Desenvolve tem qual grau de prioridade/importância para você?",
    weight: 2,
    alternatives: [
      { value: "1", label: "Alta prioridade" },
      { value: "2", label: "Média prioridade" },
      { value: "3", label: "Baixa prioridade" },
    ],
  },
  {
    id: "q7",
    question: "Quantas horas por semana está disposto a se dedicar ao Projeto Desenvolve?",
    weight: 2,
    alternatives: [
      { value: "1", label: "Entre 1 e 2 horas" },
      { value: "2", label: "Entre 3 e 4 horas" },
      { value: "3", label: "Entre 5 e 8 horas" },
      { value: "4", label: "Entre 8 e 12 horas" },
      { value: "5", label: "Mais de 12 horas" },
    ],
  },
  {
    id: "q8",
    question: "Qual a sua disposição para dedicar aos estudos do curso Projeto Desenvolve?",
    weight: 1,
    alternatives: [
      { value: "1", label: "Estudar todos os dias" },
      { value: "2", label: "Estudar algumas vezes por semana" },
      { value: "3", label: "Estudar apenas aos finais de semana" },
      { value: "4", label: "Estudar esporadicamente, sem rotina definida" },
      { value: "5", label: "Nenhuma disposição" },
    ],
  },
  {
    id: "q9",
    question: "Como você lida com situações de frustração ou dificuldade em aprender?",
    weight: 1,
    alternatives: [
      { value: "1", label: "Procuro ajuda" },
      { value: "2", label: "Tento resolver sozinho" },
      { value: "3", label: "Desanimo facilmente" },
    ],
  },
];

const QUESTIONS_PER_STEP = 2; // Define quantas perguntas por etapa
const totalSteps = Math.ceil(questions.length / QUESTIONS_PER_STEP);

export default function Questionnaire() {
  const navigate = useNavigate();
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = React.useState(0);

  // Seleciona as perguntas da etapa atual
  const currentQuestions = questions.slice(
    currentStep * QUESTIONS_PER_STEP,
    (currentStep + 1) * QUESTIONS_PER_STEP
  );

  // Atualiza a resposta de uma pergunta
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // Valida se todas as perguntas da etapa atual foram respondidas
  const validateStep = (): boolean => {
    for (const q of currentQuestions) {
      if (!answers[q.id]) {
        alert("Por favor, responda todas as perguntas desta etapa.");
        return false;
      }
    }
    return true;
  };

  // Avança para a próxima etapa
  const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Retorna à etapa anterior
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // No submit final, valida todas as respostas e envia o post
  const handleFinalSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateStep()) return;

    // Calcula a pontuação total
    // let totalScore = 0;
    // questions.forEach((q) => {
    //   const answerValue = answers[q.id];
    //   const alternative = q.alternatives.find((alt) => alt.value === answerValue);
    //   if (alternative) {
    //     totalScore += alternative.score * q.weight;
    //   }
    // });

    const payload = {
      answers,
      // score: totalScore,
    };

    try {
      const response = await axios.post("/api/questionnaire", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Questionário enviado com sucesso:", response.data);
      navigate("/sucess");
    } catch (error) {
      console.error("Erro ao enviar o questionário:", error);
      alert("Erro ao enviar o questionário. Tente novamente.");
    }
  };

  return (
    <Card>
      {/* Indicador de progresso */}
      <Typography variant="h6" align="center" gutterBottom>
      Etapa {currentStep + 1} de {totalSteps}
      </Typography>
      <Box
      component="form"
      onSubmit={
        currentStep === totalSteps - 1 ? handleFinalSubmit : handleNext
      }
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
      {currentQuestions.map((q) => (
        <FormControl key={q.id} component="fieldset">
        <FormLabel component="legend">
          {q.question} 
          {/* (Peso = {q.weight}x) */}
        </FormLabel>
        <RadioGroup
          value={answers[q.id] || ""}
          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
        >
          {q.alternatives.map((alt) => (
          <StyledFormControlLabel
            key={alt.value}
            value={alt.value}
            control={<Radio />}
            label={`${alt.label}`}
          />
          ))}
        </RadioGroup>
        </FormControl>
      ))}

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {currentStep > 0 && (
        <Button variant="outlined" onClick={handleBack}>
          Voltar
        </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
        {currentStep === totalSteps - 1 ? "Enviar Questionário" : "Próximo"}
        </Button>
      </Box>
      </Box>
    </Card>
  );
}