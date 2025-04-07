import React, { useState } from "react";
import { Box, Typography, Button, Link } from "@mui/material";
import StepProgressBar from "../ProgressBar/ProgressBar";

const statusMessages = {
  "Em análise(prova)": {
    title: "Em Análise (Prova)",
    message: "Estamos analisando sua inscrição. Você pode acompanhar seu status por aqui ou esperar receber uma notificação nossa, com o resultado final, pelo seu WhatsApp. Enquanto isso, convidamos você a conhecer um pouco mais sobre o Projeto Desenvolve no nosso site:",
    color: "#FF7826",
  },
  "Não apto": {
    title: "Não Apto",
    message: "Infelizmente você não foi selecionado para o Projeto Desenvolve, mas não se preocupe que você pode tentar sua inscrição quando um novo processo for aberto.",
    color: "#F4171B",
  },
  "Em análise": {
    title: "Em Análise",
    message: "Estamos analisando sua inscrição. Você pode acompanhar seu status por aqui ou esperar receber uma notificação nossa, com o resultado final, pelo seu WhatsApp.",
    color: "#FF7826",
  },
  "Método não aprovado": {
    title: "Método Não Aprovado",
    message: "Infelizmente o método escolhido não foi aprovado, mas você pode tentar sua inscrição por outro método, caso não tenha tentado ainda!",
    color: "#FF5126",
  },
  "Aprovado": {
    title: "Aprovado",
    message: "Queremos te desejar parabéns! Você foi aprovado no Projeto Desenvolve e agora basta fazer sua matrícula. E aí, preparado para começar seus estudos com a gente?",
    color: "#2CD731",
  },
};

const buttons = {
    "Em análise(prova)": (
      <Button
        variant="contained"
        color="primary"
        sx={{ width: 1, mt: "20px", backgroundColor: "#8C44FF" }}
        href="https://reagendamento.pdinfinita.com.br/"
        target="_blank"
        rel="noopener"
      >
        Reagendar
      </Button>
    ),
    "Método não aprovado": (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => window.location.href = '/processos-seletivos'}
        sx={{ width: 1, mt: "50px", backgroundColor: "#8C44FF" }} 
      >
        Novo Método
      </Button>
    ),
    "Aprovado": (
      <Button
        variant="contained"
        color="primary"
        sx={{ width: 1, mt: "50px", backgroundColor: "#8C44FF" }}
        href="/Matrícula"
      >
        Avançar
      </Button>
    ),
  };

const StatusPage = () => {
  const [status, setStatus] = useState("Método não aprovado");

  
  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: "auto",
        paddingLeft:8,
        paddingRight:8,
        borderRadius: 1,
        boxShadow: 3,
        textAlign: "start",
        bgcolor: "white",
        fontFamily: 'Montserrat, sans-serif',
        height: '60vh',
        width:'60vw',
        display: 'flex',
        flexDirection: 'column',
         // Aumentado para mais espaço vertical entre elementos
      }}
    >
      {/* Ajuste na barra de progresso para exibir o texto "5/5" */}
      <StepProgressBar 
        step={5} 
        totalSteps={5} 
        progressSx={{ '& .MuiLinearProgress-bar': { backgroundColor: statusMessages[status].color } }}
        />
      <Typography variant="h6" fontWeight="bold" color={'black'}>
        {statusMessages[status].title}
      </Typography>
      <Typography  mt={1} lineHeight={1.6} sx={{fontSize:'14px',fontWeight: 500}}>
        {statusMessages[status].message}
      </Typography>
      {status === "Não apto" && (
        <>
          <Typography  mt={1} lineHeight={1.6} sx={{fontSize:'14px', fontWeight: 500}}>
            Acompanhe e fique atualizado com tudo do Projeto Desenvolve através de{" "}
            <Link
              href="https://projetodesenvolve.com.br/"
              target="_blank"
              rel="noopener"
              sx={{ mx: 0.5 }}
            >
              nosso site
            </Link>{" "}
            e de{" "}
            <Link
              href="https://www.instagram.com/projetodesenvolve_br/"
              target="_blank"
              rel="noopener"
              sx={{ mx: 0.5 }}
            >
              nossas redes sociais
            </Link>.
          </Typography>
          {/* Adicionando o texto adicional do Figma */}
          <Typography  mt={2} lineHeight={1} color="textSecondary" paddingLeft={2} sx={{fontWeight:'200', fontSize:'10px', color:'black'}}   >
            <strong>Quer saber por que você não foi aprovado? Entre em contato com um de nossos monitores através do nosso 
              <Link
              href="https://wa.me/+553182146973 "
              target="_blank"
              rel="noopener"
              sx={{ mx: 0.5 }}
            >
            canal de comunicação
            </Link> que ele te tirar todas suas dúvidas!</strong>
          </Typography>
        </>
      )}
      {status === "Método não aprovado" && (
        <>
          <Typography  mt={2} lineHeight={1} color="textSecondary" paddingLeft={2} sx={{fontWeight:'200', fontSize:'10px',color:'black'}}   >
            <strong>Quer saber por que você não foi aprovado? Entre em contato com um de nossos monitores através do nosso 
              <Link
              href="https://wa.me/+553182146973 "
              target="_blank"
              rel="noopener"
              sx={{ mx: 0.5 }}
            >
            canal de comunicação
            </Link> que ele te tirar todas suas dúvidas!</strong>
          </Typography>
        </>
      )}
      {(status === "Em análise(prova)" || status === "Em análise") && (
        <>
            <Typography sx={{ fontSize: '14px', fontWeight: 500, ml: -0.5 }}>
            <Link
                href="https://projetodesenvolve.com.br/"
                target="_blank"
                rel="noopener"
                sx={{ mx: 0.5 }}
            >
                https://projetodesenvolve.com.br/
            </Link>
            </Typography>
            <Typography sx={{ color: '#8C44FF', mt: '15px', mb: '15px' }}>
            <strong>BOA SORTE!</strong>
            </Typography>
        </>
      )}
      {status === "Em análise(prova)" && (
        <>
            <Typography lineHeight={1.3} sx={{ fontSize: '14px', fontWeight: 500 }}>
            Caso precise reagendar sua prova, clique no botão abaixo. Atenção: o reagendamento só pode ser feito <strong>até 1 (um) dia antes</strong> da data originalmente marcada.
            </Typography>
        </>
      )}

      {buttons[status] && <Box sx={{ mt: 2, width:1 }}>{buttons[status]}</Box>}
    </Box>
  );
};

export default StatusPage;