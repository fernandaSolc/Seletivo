import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import AppTheme from './shared-theme/AppTheme';
import ColorModeSelect from './shared-theme/ColorModeSelect';
import { SitemarkIcon } from './CustomIcons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow: '0px 4px 31.1px 5px rgba(0, 0, 0, 0.2)',
  borderRadius: '15px',
  backgroundColor: '#F4F4F4',
  overflowY: 'auto',
    scrollbarWidth: 'thin',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#F4F4F4',
  },
  [theme.breakpoints.up('sm')]: {
    width: '550px',
    height: 'auto',
    minHeight: '600px',
    maxHeight: '700px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [valoresFormulario, setValoresFormulario] = React.useState({
    nome: "",
    nomeSocial: "",
    cpf: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    cidade: "",
    emailResponsavel: "",
  });

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

  const [otp, setOtp] = React.useState(""); // Armazena o código OTP
  const [otpSent, setOtpSent] = React.useState(false); // Indica se o OTP foi enviado
  const [otpError, setOtpError] = React.useState(""); // Mensagem de erro do OTP

  const navigate = useNavigate();

  const handleDobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dobDate = new Date(event.target.value);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    setShowGuardianEmail(age < 18);
    setValoresFormulario({ ...valoresFormulario, dataNascimento: event.target.value });
  };

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

    // Validação do Telefone
    if (!valoresFormulario.telefone || valoresFormulario.telefone.length < 12) {
      setPhoneError(true);
      setPhoneErrorMessage('O número de telefone deve ter pelo menos 12 dígitos.');
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

    // Validação do E-mail do Responsável
    const dobDate = new Date(valoresFormulario.dataNascimento);
    const age = new Date().getFullYear() - dobDate.getFullYear();
    if (age < 18 && (!valoresFormulario.emailResponsavel || !emailRegex.test(valoresFormulario.emailResponsavel))) {
      setGuardianEmailError(true);
      setGuardianEmailErrorMessage('O e-mail do responsável é obrigatório para menores de idade.');
      isValid = false;
    } else {
      setGuardianEmailError(false);
      setGuardianEmailErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      try {
        const response = await axios.post('/auth/register', valoresFormulario);
        console.log('Registro bem-sucedido:', response.data);
        navigate('/verify-number'); // Redireciona para a tela de verificação
      } catch (error) {
        console.error('Erro no registro:', error);
        // Exibir mensagem de erro para o usuário
        alert('Erro ao registrar. Verifique os dados e tente novamente.');
      }
    }
  };

  // Função para enviar OTP
  const sendOtp = async () => {
    try {
      const response = await axios.post("http://messager.mychat.help/send-otp/", {
        phone_number: valoresFormulario.telefone,
      });

      if (response.status === 200) {
        setOtpSent(true);
        alert("Código enviado para seu número!");
      }
    } catch (error) {
      console.error("Erro ao enviar OTP:", error);
      alert("Erro ao enviar código. Verifique o número e tente novamente.");
    }
  };

  // Função para validar OTP
  const validateOtp = async () => {
    try {
      const response = await axios.post("http://messager.mychat.help/validate-otp/", {
        phone_number: valoresFormulario.telefone,
        otp: otp,
      });

      if (response.status === 200) {
        alert("Código validado com sucesso!");
        navigate("/next-page"); // Redireciona após validação
      } else {
        setOtpError("Código inválido. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao validar OTP:", error);
      setOtpError("Erro ao validar. Tente novamente.");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem',  }}>
        <ColorModeSelect />
      </Box>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, }}
          >
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
                color={nameError ? 'error' : 'primary'}
                size="small"
              />
            </FormControl>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <FormControl sx={{ flex: 1 }}>
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
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="cpf">CPF*</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="cpf"
                  placeholder="Insira seu CPF"
                  name="cpf"
                  autoComplete="cpf"
                  variant="outlined"
                  value={valoresFormulario.cpf}
                  onChange={(e) => setValoresFormulario({ ...valoresFormulario, cpf: e.target.value })}
                  error={cpfError}
                  helperText={cpfErrorMessage}
                  color={cpfError ? 'error' : 'primary'}
                  size="small"
                />
              </FormControl>
            </Box>
            <FormControl>
              <FormLabel htmlFor="email">Email*</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="Insira seu email"
                name="email"
                autoComplete="email"
                variant="outlined"
                value={valoresFormulario.email}
                onChange={(e) => setValoresFormulario({ ...valoresFormulario, email: e.target.value })}
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
                size="small"
              />
            </FormControl>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <FormControl sx={{ flex: 1 }}>
                <FormLabel htmlFor="phone">Telefone*</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  placeholder="Insira seu telefone"
                  name="phone"
                  autoComplete="phone"
                  variant="outlined"
                  value={valoresFormulario.telefone}
                  onChange={(e) => setValoresFormulario({ ...valoresFormulario, telefone: e.target.value })}
                  error={phoneError}
                  helperText={phoneErrorMessage}
                  color={phoneError ? 'error' : 'primary'}
                  size="small"
                />
                <Button variant="contained" onClick={sendOtp} sx={{ mt: 2 }}>
                  Enviar Código
                </Button>
                {otpSent && (
                  <>
                    <TextField
                      label="Código OTP"
                      fullWidth
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      sx={{ mt: 2 }}
                      error={!!otpError}
                      helperText={otpError}
                    />
                    <Button variant="contained" onClick={validateOtp} sx={{ mt: 2 }}>
                      Validar Código
                    </Button>
                  </>
                )}
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
                  autoComplete="dob"
                  variant="outlined"
                  value={valoresFormulario.dataNascimento}
                  onChange={handleDobChange}
                  error={dobError}
                  helperText={dobErrorMessage}
                  color={dobError ? 'error' : 'primary'}
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
                  autoComplete="guardianEmail"
                  variant="outlined"
                  value={valoresFormulario.emailResponsavel}
                  onChange={(e) => setValoresFormulario({ ...valoresFormulario, emailResponsavel: e.target.value })}
                  error={guardianEmailError}
                  helperText={guardianEmailErrorMessage}
                  color={guardianEmailError ? 'error' : 'primary'}
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
                autoComplete="city"
                variant="outlined"
                value={valoresFormulario.cidade}
                onChange={(e) => setValoresFormulario({ ...valoresFormulario, cidade: e.target.value })}
                error={cityError}
                helperText={cityErrorMessage}
                color={cityError ? 'error' : 'primary'}
                size="small"
              >
                <MenuItem value="Itabira">Itabira</MenuItem>
                <MenuItem value="Bom despacho">Bom despacho</MenuItem>
              </TextField>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              sx={{ backgroundColor: '#8C44FF', '&:hover': { backgroundColor: '#7A3CE0' } }}
            >
              Cadastrar
            </Button>
            <Typography variant="body2" align="center">
              Já tem conta? <Link to="/login" style={{ color: '#A1A1A1' }}>Fazer login</Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}