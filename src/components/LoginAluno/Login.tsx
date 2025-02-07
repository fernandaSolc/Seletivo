import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../../layout/AuthLayout';
import { SitemarkIcon } from '../cadastroAluno/CustomIcons';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice'

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
  backgroundColor: theme.palette.background.default,
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
    minHeight: '400px',
    maxHeight: '500px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
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

const validateCPF = (cpf: string) => {
  const cpfRegex = /^\d{11}$/;
  return cpfRegex.test(cpf);
};

const validateDOB = (dob: string) => {
  const date = new Date(dob);
  const today = new Date();
  return date < today;
};

export default function Login() {
  const [cpf, setCpf] = React.useState('');
  const [dob, setDob] = React.useState('');
  const [cpfError, setCpfError] = React.useState(false);
  const [cpfErrorMessage, setCpfErrorMessage] = React.useState('');
  const [dobError, setDobError] = React.useState(false);
  const [dobErrorMessage, setDobErrorMessage] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let valid = true;

    if (!validateCPF(cpf)) {
      setCpfError(true);
      setCpfErrorMessage('CPF deve conter 11 dígitos.');
      valid = false;
    } else {
      setCpfError(false);
      setCpfErrorMessage('');
    }

    if (!validateDOB(dob)) {
      setDobError(true);
      setDobErrorMessage('Data de Nascimento inválida.');
      valid = false;
    } else {
      setDobError(false);
      setDobErrorMessage('');
    }

    if (valid) {
      try {
        const response = await axios.post('/auth/login', { cpf, dob });
        console.log('Login bem-sucedido:', response.data);
        dispatch(login({ user: response.data.user, access: response.data.access, refresh: response.data.refresh }));
        navigate('/confirmar-contato'); // Na verdade deveria ser '/status-inscricao'
      } catch (error) {
        console.error('Erro no login:', error);
        alert('CPF ou Data de Nascimento inválidos. Tente novamente.');
      }
    }
  };

  return (
    <AuthLayout>
      <CssBaseline enableColorScheme />
      <LoginContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
          >
            <FormControl>
              <TextField
                required
                fullWidth
                id="cpf"
                placeholder="Insira seu CPF"
                name="cpf"
                autoComplete="cpf"
                variant="outlined"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                error={cpfError}
                helperText={cpfErrorMessage}
                color={cpfError ? 'error' : 'primary'}
                size="small"
              />
            </FormControl>
            <FormControl>
              <TextField
                required
                fullWidth
                id="dob"
                placeholder="Insira sua data de nascimento"
                name="dob"
                type="date"
                autoComplete="dob"
                variant="outlined"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                error={dobError}
                helperText={dobErrorMessage}
                color={dobError ? 'error' : 'primary'}
                size="small"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#8C44FF', '&:hover': { backgroundColor: '#7A3CE0' } }}
            >
              Entrar
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              Não tem uma conta? <Link to="/signup">Inscreva-se</Link>
            </Typography>
          </Box>
        </Card>
      </LoginContainer>
    </AuthLayout>
  );
}
