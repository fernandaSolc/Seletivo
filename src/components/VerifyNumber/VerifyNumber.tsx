// VerifyNumber.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "0px 4px 31.1px 5px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  backgroundColor: theme.palette.background.default,
}));

const VerifyNumberContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function VerifyNumber() {
  // Armazena cada dígito do OTP em um array (6 dígitos)
  const [token, setToken] = React.useState(["", "", "", "", "", ""]);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Ao digitar, valida que seja apenas número e move para o próximo campo
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Aceita somente dígitos
    const newToken = [...token];
    newToken[index] = value;
    setToken(newToken);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Permite voltar ao campo anterior com backspace se o campo atual estiver vazio
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !token[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Função que valida o OTP inserido
  const validateOtp = async (otp: string) => {
    try {
      const response = await axios.post(
        'https://messager.mychat.help/validate-otp/',
        { code: otp },
        {
          headers: {
            'Content-Type': 'application/json',
            // Se necessário, inclua aqui o token ou API Key exigido pela API:
            'X-CSRFTOKEN': 'SeuTokenAqui'
          }
        }
      );
      console.log('OTP validado:', response.data);
      return true;
    } catch (error) {
      console.error('Erro ao validar OTP:', error);
      alert('Erro ao validar OTP. Verifique o código e tente novamente.');
      return false;
    }
  };

  // Ao submeter, junta os 6 dígitos e valida o código
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullToken = token.join("");
    if (fullToken.length === 6) {
      const isValid = await validateOtp(fullToken);
      if (isValid) {
        // Se validado com sucesso, navega para a próxima etapa
        navigate("/verify-email");
      }
    } else {
      alert("Por favor, preencha os 6 dígitos do código.");
    }
  };

  return (
    <VerifyNumberContainer direction="column" justifyContent="center">
      <CssBaseline />
      <Card>
        <h2>Verificar OTP</h2>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FormLabel>Código OTP</FormLabel>
            <Stack direction="row" spacing={1}>
              {token.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputsRef.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)}
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "20px", width: "40px" } }}
                />
              ))}
            </Stack>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Verificar
          </Button>
        </Box>
      </Card>
    </VerifyNumberContainer>
  );
}