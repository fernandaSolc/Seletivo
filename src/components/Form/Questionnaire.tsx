// Questionnaire.tsx
import * as React from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
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

// Estrutura das perguntas do questionário
const questions = [
  {
    id: "q1",
    question: "Qual é a sua situação profissional atualmente?",
    weight: 2,
    alternatives: [
      { value: "1", label: "Trabalho", score: 20 },
      { value: "2", label: "Estudo", score: 20 },
      { value: "3", label: "Trabalho e estudo", score: 5 },
      { value: "4", label: "Nem trabalho nem estudo", score: 55 },
    ],
  },
  {
    id: "q2",
    question: "Possui experiência com Programação, TI e tecnologias afins?",
    weight: 1,
    alternatives: [
      { value: "1", label: "Nenhuma experiência", score: 10 },
      { value: "2", label: "Conhecimentos básicos", score: 20 },
      { value: "3", label: "Experiência intermediária", score: 30 },
      { value: "4", label: "Experiência avançada", score: 40 },
    ],
  },
  {
    id: "q3",
    question: "Quanto tempo de experiência na área da tecnologia você tem? (se aplicável)",
    weight: 1,
    alternatives: [
      { value: "1", label: "Menos de 1 ano", score: 10 },
      { value: "2", label: "Entre 1 à 2 anos", score: 20 },
      { value: "3", label: "Entre 2 à 4 anos", score: 30 },
      { value: "4", label: "Mais de 5 anos", score: 40 },
    ],
  },
  {
    id: "q4",
    question: "Qual seu nível de conhecimento em linguagem de programação?",
    weight: 1,
    alternatives: [
      { value: "1", label: "Nenhum", score: 10 },
      { value: "2", label: "Básico", score: 20 },
      { value: "3", label: "Intermediário", score: 30 },
      { value: "4", label: "Avançado", score: 40 },
    ],
  },
  {
    id: "q5",
    question: "Qual o nível de motivação que você julga ter em relação ao curso?",
    weight: 2,
    alternatives: [
      { value: "1", label: "Muito motivado", score: 40 },
      { value: "2", label: "Motivado", score: 30 },
      { value: "3", label: "Curioso", score: 15 },
      { value: "4", label: "Indiferente", score: 10 },
      { value: "5", label: "Pouco motivado", score: 5 },
    ],
  },
  {
    id: "q6",
    question: "O Projeto Desenvolve tem qual grau de prioridade/importância para você?",
    weight: 2,
    alternatives: [
      { value: "1", label: "Alta prioridade", score: 60 },
      { value: "2", label: "Média prioridade", score: 30 },
      { value: "3", label: "Baixa prioridade", score: 10 },
    ],
  },
  {
    id: "q7",
    question: "Quantas horas por semana está disposto a se dedicar ao Projeto Desenvolve?",
    weight: 2,
    alternatives: [
      { value: "1", label: "Entre 1 e 2 horas", score: 0 },
      { value: "2", label: "Entre 3 e 4 horas", score: 10 },
      { value: "3", label: "Entre 5 e 8 horas", score: 25 },
      { value: "4", label: "Entre 8 e 12 horas", score: 30 },
      { value: "5", label: "Mais de 12 horas", score: 35 },
    ],
  },
  {
    id: "q8",
    question: "Qual a sua disposição para dedicar aos estudos do curso Projeto Desenvolve?",
    weight: 1,
    alternatives: [
      { value: "1", label: "Estudar todos os dias", score: 40 },
      { value: "2", label: "Estudar algumas vezes por semana", score: 35 },
      { value: "3", label: "Estudar apenas aos finais de semana", score: 15 },
      { value: "4", label: "Estudar esporadicamente, sem rotina definida", score: 10 },
      { value: "5", label: "Nenhuma disposição", score: 0 },
    ],
  },
  {
    id: "q9",
    question: "Como você lida com situações de frustração ou dificuldade em aprender?",
    weight: 1,
    alternatives: [
      { value: "1", label: "Procuro ajuda", score: 50 },
      { value: "2", label: "Tento resolver sozinho", score: 40 },
      { value: "3", label: "Desanimo facilmente", score: 10 },
    ],
  },
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  // Atualiza a resposta de uma pergunta
  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // Ao submeter, verifica se todas as perguntas foram respondidas, calcula a nota total e envia o post
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Verifica se todas as perguntas foram respondidas
    for (const q of questions) {
      if (!answers[q.id]) {
        alert("Por favor, responda todas as perguntas.");
        return;
      }
    }

    // Calcula a nota total
    let totalScore = 0;
    questions.forEach((q) => {
      const answerValue = answers[q.id];
      const alternative = q.alternatives.find((alt) => alt.value === answerValue);
      if (alternative) {
        totalScore += alternative.score * q.weight;
      }
    });

    // Cria o payload com as respostas e a nota calculada
    const payload = {
      answers,
      score: totalScore,
    };

    try {
      const response = await axios.post("/api/questionnaire", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Questionário enviado com sucesso:", response.data);
      // Ao sucesso, navega para a dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao enviar o questionário:", error);
      alert("Erro ao enviar o questionário. Tente novamente.");
    }
  };

  return (
    <Card>
      <Typography variant="h5" align="center" gutterBottom>
        Questionário
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {questions.map((q) => (
          <FormControl key={q.id} component="fieldset">
            <FormLabel component="legend">
              {q.question} (Peso = {q.weight}x)
            </FormLabel>
            <RadioGroup
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            >
              {q.alternatives.map((alt) => (
                <FormControlLabel
                  key={alt.value}
                  value={alt.value}
                  control={<Radio />}
                  label={`${alt.label} - ${alt.score}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        ))}
        <Button type="submit" variant="contained" color="primary">
          Enviar Questionário
        </Button>
      </Box>
    </Card>
  );
}