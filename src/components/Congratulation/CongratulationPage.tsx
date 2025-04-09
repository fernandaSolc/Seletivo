import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardContainer = styled('div')(({ theme }) => ({
  padding: "0px 50px",
  margin: 'auto',
  maxWidth: '500px',
  height: '70vh',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'start',
  fontFamily: "Montserrat, sans-serif",

  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.paper,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#D9D9D9',
    borderRadius: '16px 50px 50px 16px',
  },
  '&::-webkit-scrollbar-button': {
    display: 'none',
   
  },
}));

export default function CongratulationPage() {
  return (
    <CardContainer>
      <Box sx={{mt: 6}}>
        <Typography variant="body1" fontWeight="bold" sx={{ mb: 2, fontSize: "24px" }}>
          Parabéns!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: '15px',
            '& strong': { fontWeight: 600 },
            '& .highlight': { color: '#8C44FF', fontWeight: 600 },
          }}
        >
          Obrigado por confiar no <span className="highlight">Projeto Desenvolve</span>!
          <br /><br />
          Ficamos muito felizes por ter você com a gente nessa jornada. Obrigado por acreditar no nosso projeto e querer fazer parte dessa experiência.
          <br /><br />
          Desejamos muito sucesso nos seus estudos e que essa seja uma fase de muito aprendizado e crescimento! Conte conosco para o que precisar.
          <br /><br />
          <strong>Boa sorte e bons estudos!</strong>
        </Typography>
      </Box>
    </CardContainer>
  );
}
