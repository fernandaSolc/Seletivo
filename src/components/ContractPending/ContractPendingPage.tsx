import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import StepProgressBar from "../ProgressBar/ProgressBar";

const CardContainer = styled('div')(({ theme }) => ({
  padding: "0px 50px 0px 50px",
  margin: 'auto',
  maxWidth: '500px',
  height: '40vh',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px 5px 5px 5px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  fontFamily:"Montserrat, sans serif",

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
    height: 0,
    width: 0,
  },
}));

export default function ContractPendingPage() {
  return (
    <CardContainer>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1" fontWeight="bold" sx={{ mb: 2, fontSize:"24px" }}>
          Contrato
        </Typography>
        <Typography variant="body2" sx={{ fontSize: '15px','& strong': {color: '#8C44FF',} }}>
          Seu contrato já foi enviado para o e-mail cadastrado. <strong>Agora, basta acessá-lo, revisar e assiná-lo. </strong>
          <br />
          Assim que a assinatura for concluída, volte aqui para seguir com as próximas orientações do processo seletivo.
        </Typography>
      </Box>
    </CardContainer>
  );
}
