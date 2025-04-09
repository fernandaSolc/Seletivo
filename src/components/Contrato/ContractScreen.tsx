import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Logo from '../../assets/Logo.png';

const CardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  margin: 'auto',
  maxWidth: '600px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export default function ContractScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleCheckboxChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsChecked(event.target.checked);
  };
  const handleCheckboxChange2 = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setIsChecked2(event.target.checked);
  };

  return (
    <CardContainer>
      <Box sx={{ marginBottom: 2 }}>
        <img src={Logo} style={{ width: '150px', height: 'auto' }} />
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          marginBottom: 2,
          fontFamily: 'Montserrat, sans-serif',
          textAlign: 'center',
        }}
      >
        Antes de iniciar a inscrição, leia com atenção os tópicos abaixo!
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: 2,
          fontWeight: 400,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '12px',
          lineHeight: 1.5,
          letterSpacing: '0%',
          textAlign: 'left',
          pl: 5,
          pr: 7,
          '& strong': {
            color: '#8C44FF',
          },
        }}
      >
        • O processo de inscrição é dividido em algumas etapas e você pode acompanhar seu status através da barra de progresso que aparecerá na parte superior da página.
        <br /><br />
        • Em caso de dúvida, basta clicar no ícone do WhatsApp que será redirecionado para nosso canal de comunicação e um monitor irá saná-las.
        <br /><br />
        • É fundamental que a cidade que reside seja a mesma de “Cidade Inscrita” informada no momento do cadastro. Esse dado será verificado através do <strong>comprovante de residência.</strong> Caso haja inconsistências, a matrícula será <strong>automaticamente cancelada.</strong>
        <br /><br />
        • Na hora de realizar a matrícula se você marcou que estudou em escola pública, saiba que essa informação será checada no seu <strong>histórico escolar.</strong> Caso seja identificada alguma divergência, você será <strong>desqualificado imediatamente.</strong>
      </Typography>

      <FormControlLabel
        sx={{
          fontSize: 12,
          '& .MuiFormControlLabel-label': {
            padding: 0,
            lineHeight: 1.2,
            fontSize: 11.5,
            fontFamily: 'Montserrat, sans-serif',
          },
        }}
        required
        control={
          <Checkbox
            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
            checked={isChecked2}
            onChange={handleCheckboxChange2}
          />
        }
        label="Declaro estar ciente e autorizo o uso dos meus dados pessoais para fins de comunicação institucional e promoção de campanhas de marketing por parte da organização."
      />
      <br/>
      <FormControlLabel
        sx={{
          fontSize: 12,
          '& .MuiFormControlLabel-label': {
            padding: 0,
            lineHeight: 1.2,
            fontSize: 11.5,
            fontFamily: 'Montserrat, sans-serif',
          },
        }}
        required
        control={
          <Checkbox
            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        }
        label="Declaro que todas as informações fornecidas são verdadeiras e estou ciente de que, caso sejam identificadas inconsistências, minha matrícula será desqualificada."
      />
      

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Button
        type="submit"
        variant="contained"
        disabled={!(isChecked && isChecked2)}
        sx={{
          backgroundColor: '#8C44FF',
          color: '#fff',
          textTransform: 'none',
          width: '100%',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 'bold',
          mt: 1,
          '&:disabled': {
            backgroundColor: '#B0B0B0',
            color: '#FFFFFF',
          },
        }}
      >
        CONTINUAR
      </Button>

      </Box>
    </CardContainer>
  );
}