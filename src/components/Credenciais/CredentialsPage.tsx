import { Typography, Box, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import StepProgressBar from "../ProgressBar/ProgressBar";

const CardContainer = styled('div')(({ theme }) => ({
  padding: "0px 50px",
  margin: 'auto',
  maxWidth: '500px',
  height: '50vh',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
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
    height: 0,
    width: 0,
  },
}));

export default function CredentialsPage() {
  return (
    <CardContainer>
      <Box >
        <Typography variant="body1" fontWeight="bold" sx={{ mb: 2, fontSize: "24px" }}>
          Credenciais
        </Typography>

        <Typography variant="body2" sx={{ fontSize: '15px', mb: 3 }}>
          As suas credenciais de acesso já foram enviadas para o seu <strong>e-mail</strong> e também pelo <strong>WhatsApp</strong>.
          <br />
          Confira sua caixa de entrada e suas mensagens para acessá-las.
          <br />
          Se tiver qualquer dúvida ou não encontrar as credenciais,{' '}
          <Link href="https://wa.me/+5531982146973" underline="always" sx={{ color: '#8C44FF', fontWeight: 500 }}>
            entre em contato conosco!
          </Link>
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#8C44FF',
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '6px',
            width: '100%',
            '&:hover': {
              backgroundColor: '#732fd8',
            },
          }}
        >
          Avançar
        </Button>
      </Box>
    </CardContainer>
  );
}
