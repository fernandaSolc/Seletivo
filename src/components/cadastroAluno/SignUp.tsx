// SignUpTest.tsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Card = styled('div')(({ theme }) => ({
  padding: '16px',
  margin: 'auto',
  maxWidth: '550px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '15px',
  boxShadow: '0px 4px 31.1px 5px rgba(0, 0, 0, 0.2)',
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUpTest() {
  const [valoresFormulario, setValoresFormulario] = React.useState({
    nome: "",
    nomeSocial: "",
    cpf: "",
    email: "",
    telefone: "+55",
    dataNascimento: "",
    cidade: "",
    emailResponsavel: "",
  });

  // Estados para erros
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [cpfError, setCpfError] = React.useState(false);
  const [cpfErrorMessage, setCpfErrorMessage] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState('');
  const [dobError, setDobError] = React.useState(false);
  const [dobErrorMessage, setDobErrorMessage] = React.useState('');
  const [cityError, setCityError] = React.useState(false);
  const [cityErrorMessage, setCityErrorMessage] = React.useState('');
  const [guardianEmailError, setGuardianEmailError] = React.useState(false);
  const [guardianEmailErrorMessage, setGuardianEmailErrorMessage] = React.useState('');
  const [showGuardianEmail, setShowGuardianEmail] = React.useState(false);

  const navigate = useNavigate();

  // Atualiza o campo de data de nascimento e define se deve mostrar o email do responsável
  const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dobDate = new Date(event.target.value);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    setShowGuardianEmail(age < 18);
    setValoresFormulario({ ...valoresFormulario, dataNascimento: event.target.value });
  };

  // Valida os inputs do formulário
  const validateInputs = () => {
    let isValid = true;
    // Validação do Nome
    if (!valoresFormulario.nome) {
      setNameError(true);
      setNameErrorMessage('Nome é obrigatório.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }
    // Validação do CPF
    if (!valoresFormulario.cpf || valoresFormulario.cpf.length !== 11) {
      setCpfError(true);
      setCpfErrorMessage('CPF deve conter 11 dígitos.');
      isValid = false;
    } else {
      setCpfError(false);
      setCpfErrorMessage('');
    }
    // Validação do E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!valoresFormulario.email || !emailRegex.test(valoresFormulario.email)) {
      setEmailError(true);
      setEmailErrorMessage('Insira um e-mail válido.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    // Validação do Telefone: deve começar com +55 e ter pelo menos 12 dígitos
    if (
      !valoresFormulario.telefone ||
      !valoresFormulario.telefone.startsWith('+55') ||
      valoresFormulario.telefone.length < 12
    ) {
      setPhoneError(true);
      setPhoneErrorMessage('O número de telefone deve começar com +55 e ter pelo menos 12 dígitos.');
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage('');
    }
    // Validação da Data de Nascimento
    if (!valoresFormulario.dataNascimento) {
      setDobError(true);
      setDobErrorMessage('Data de nascimento é obrigatória.');
      isValid = false;
    } else {
      setDobError(false);
      setDobErrorMessage('');
    }
    // Validação da Cidade
    if (!valoresFormulario.cidade) {
      setCityError(true);
      setCityErrorMessage('A cidade é obrigatória.');
      isValid = false;
    } else {
      setCityError(false);
      setCityErrorMessage('');
    }
    // Validação do E-mail do Responsável para menores de 18 anos
    if (showGuardianEmail) {
      if (!valoresFormulario.emailResponsavel || !emailRegex.test(valoresFormulario.emailResponsavel)) {
        setGuardianEmailError(true);
        setGuardianEmailErrorMessage('O e-mail do responsável é obrigatório para menores de idade.');
        isValid = false;
      } else {
        setGuardianEmailError(false);
        setGuardianEmailErrorMessage('');
      }
    }
    return isValid;
  };

  // Garante que o campo de telefone mantenha o prefixo +55
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith('+55')) {
      // Se o usuário digitar sem +55, adiciona-o automaticamente
      value = '+55' + value.replace(/^\+?55?/, '');
    }
    setValoresFormulario({ ...valoresFormulario, telefone: value });
  };

  // Envia o OTP para verificação do número via SMS
  const sendOtp = async (phone: string) => {
    try {
      const response = await axios.post(
        'https://messager.mychat.help/send-otp/',
        { phone_number: phone },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'SeuTokenAqui'
          }
        }
      );
      console.log('OTP enviado:', response.data);
      alert('Você receberá um token via SMS.');
      // Após envio bem-sucedido, navega para a tela de verificação de número
      navigate('/verify-number');
    } catch (error) {
      console.error('Erro ao enviar OTP:', error);
      alert('Erro ao enviar OTP. Verifique o número e tente novamente.');
    }
  };

  // Ao submeter o formulário, valida os inputs, registra o usuário e envia o OTP
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      try {
        // Registra o usuário com os dados do formulário
        const response = await axios.post('/auth/register', valoresFormulario);
        console.log('Registro bem-sucedido:', response.data);
        // Envia o OTP para o número informado
        await sendOtp(valoresFormulario.telefone);
      } catch (error) {
        console.error('Erro no registro:', error);
        alert('Erro ao registrar. Verifique os dados e tente novamente.');
      }
    }
  };

  return (
    <SignUpContainer direction="column" justifyContent="center">
      <CssBaseline />
      <Card>
        <h2>Cadastro e Envio de OTP</h2>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <FormControl>
            <FormLabel htmlFor="name">Nome completo*</FormLabel>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              placeholder="Insira seu nome"
              value={valoresFormulario.nome}
              onChange={(e) => setValoresFormulario({ ...valoresFormulario, nome: e.target.value })}
              error={nameError}
              helperText={nameErrorMessage}
              size="small"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="socialName">Nome social</FormLabel>
            <TextField
              autoComplete="socialName"
              name="socialName"
              fullWidth
              id="socialName"
              placeholder="Insira seu nome social"
              value={valoresFormulario.nomeSocial}
              onChange={(e) => setValoresFormulario({ ...valoresFormulario, nomeSocial: e.target.value })}
              size="small"
            />
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel htmlFor="cpf">CPF*</FormLabel>
              <TextField
                required
                fullWidth
                id="cpf"
                placeholder="Insira seu CPF (11 dígitos)"
                name="cpf"
                autoComplete="cpf"
                value={valoresFormulario.cpf}
                onChange={(e) => setValoresFormulario({ ...valoresFormulario, cpf: e.target.value })}
                error={cpfError}
                helperText={cpfErrorMessage}
                size="small"
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel htmlFor="email">Email*</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="Insira seu email"
                name="email"
                autoComplete="email"
                value={valoresFormulario.email}
                onChange={(e) => setValoresFormulario({ ...valoresFormulario, email: e.target.value })}
                error={emailError}
                helperText={emailErrorMessage}
                size="small"
              />
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel htmlFor="telefone">Telefone*</FormLabel>
              <TextField
                required
                fullWidth
                id="telefone"
                placeholder="Ex: +55 DDD e número"
                name="telefone"
                autoComplete="tel"
                value={valoresFormulario.telefone}
                onChange={handlePhoneChange}
                error={phoneError}
                helperText={phoneErrorMessage}
                size="small"
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel htmlFor="dob">Data de nascimento*</FormLabel>
              <TextField
                required
                fullWidth
                id="dob"
                placeholder="Insira sua data de nascimento"
                name="dob"
                type="date"
                autoComplete="bday"
                value={valoresFormulario.dataNascimento}
                onChange={handleDobChange}
                error={dobError}
                helperText={dobErrorMessage}
                size="small"
              />
            </FormControl>
          </Box>
          {showGuardianEmail && (
            <FormControl>
              <FormLabel htmlFor="guardianEmail">Email do responsável*</FormLabel>
              <TextField
                fullWidth
                id="guardianEmail"
                placeholder="Insira o email do responsável"
                name="guardianEmail"
                autoComplete="email"
                value={valoresFormulario.emailResponsavel}
                onChange={(e) => setValoresFormulario({ ...valoresFormulario, emailResponsavel: e.target.value })}
                error={guardianEmailError}
                helperText={guardianEmailErrorMessage}
                size="small"
              />
            </FormControl>
          )}
          <FormControl>
            <FormLabel htmlFor="city">Cidade de inscrição*</FormLabel>
            <TextField
              required
              fullWidth
              id="city"
              select
              placeholder="Selecione sua cidade"
              name="city"
              autoComplete="address-level2"
              value={valoresFormulario.cidade}
              onChange={(e) => setValoresFormulario({ ...valoresFormulario, cidade: e.target.value })}
              error={cityError}
              helperText={cityErrorMessage}
              size="small"
            >
              <MenuItem value="Itabira">Itabira</MenuItem>
              <MenuItem value="Bom despacho">Bom despacho</MenuItem>
            </TextField>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: '#8C44FF', '&:hover': { backgroundColor: '#7A3CE0' } }}>
            Cadastrar
          </Button>
          <Typography variant="body2" align="center">
            Já tem conta? <Link to="/login" style={{ color: '#A1A1A1' }}>Fazer login</Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  );
}