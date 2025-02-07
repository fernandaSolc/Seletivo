// SignUpTest.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = styled('div')(({ theme }) => ({
  padding: '16px',
  margin: 'auto',
  maxWidth: '550px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '15px',
  boxShadow: '0px 4px 31.1px 5px rgba(0, 0, 0, 0.2)',
}));

export default function SignUpTest() {
  // Garanta que o número esteja no formato internacional (com "+")
  const [phoneNumber, setPhoneNumber] = React.useState('+5531993918592');
  const navigate = useNavigate();

  // Função para enviar o OTP para o endpoint correto com os headers necessários
  const sendOtp = async (phoneNumber: string) => {
    try {
      const response = await axios.post(
        'https://messager.mychat.help/send-otp/',
        { phone_number: phoneNumber },
        {
          headers: {
            'Content-Type': 'application/json',
            // Se necessário, inclua aqui o token ou API Key exigido pela API:
            'X-CSRFTOKEN': 'SeuTokenAqui'
          }
        }
      );
      console.log('OTP enviado:', response.data);
      alert('Você receberá um token via SMS.');
      // Após envio bem-sucedido, navega para a tela de verificação
      navigate('/verify-number');
    } catch (error) {
      console.error('Erro ao enviar OTP:', error);
      alert('Erro ao enviar OTP. Verifique o número e tente novamente.');
    }
  };

  // Ao submeter, chamamos a função de envio do OTP
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await sendOtp(phoneNumber);
  };

  return (
    <Card>
      <h2>Teste de Cadastro e Envio de OTP</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <FormLabel>Telefone</FormLabel>
          <TextField
            required
            placeholder="+5531993918592"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Enviar OTP
        </Button>
      </form>
    </Card>
  );
}
