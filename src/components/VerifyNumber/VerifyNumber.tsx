import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Estilização do Card
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "600px", // Ajustado para corresponder ao tamanho da imagem
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "0px 4px 31.1px 5px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  backgroundColor: theme.palette.background.paper,
}));

// Estilização do Container
const VerifyNumberContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#8C44FF", 
  color: "#fff",
  borderRadius: "10px",
  padding: theme.spacing(1.5),
  fontWeight: "bold",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A3EDB",
  },
}));
const CustomLink = styled(Link)(({ theme }) => ({
  color: "#8C44FF", 
  textDecoration: "none",
  fontWeight: "500",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export default function VerifyNumber() {
  const [token, setToken] = React.useState(["", "", "", "", "", ""]);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newToken = [...token];
    newToken[index] = value;
    setToken(newToken);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !token[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const validateOtp = async (otp: string) => {
    try {
      const response = await axios.post(
        'https://messager.mychat.help/validate-otp/',
        { code: otp },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFTOKEN': 'SeuTokenAqui',
          },
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullToken = token.join("");
    if (fullToken.length === 6) {
      const isValid = await validateOtp(fullToken);
      if (isValid) {
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
        {/* Logotipo (você precisará adicionar a imagem real do logotipo) */}
        <Box sx={{ mb: 2 }}>
          <img
            src="/src/assets/Logo.png" // Substitua pelo caminho real do logotipo "Projeto Desenvolve"
            alt="Projeto Desenvolve"
            style={{ height: "60px" }}
          />
        </Box>

        {/* Título */}
        <Typography variant="h5" fontWeight="bold" align="center">
          Insira o código de 6 dígitos
        </Typography>

        {/* Mensagem de e-mail */}
        <Typography variant="body2" align="center">
          Verifique se há um código de verificação para{" "}
          <strong>(31) 9****-1639.</strong>.{" "}
          <CustomLink href="#">Mudar</CustomLink>
        </Typography>

        {/* Formulário */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          <FormControl sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium" align="center" sx={{ mb: 1 }}>
              Código de 6 dígitos
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              {token.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputsRef.current[index] = el)}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)}
                  variant="outlined"
                  size="small"
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "24px",
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#6B48FF",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#6B48FF",
                      },
                    },
                  }}
                />
              ))}
            </Stack>
          </FormControl>

          {/* Link "Reenviar código" */}
          <CustomLink href="#" align="center" sx={{ mt: 1 }}>
            Reenviar código
          </CustomLink>

          {/* Botão "Avançar" */}
          <CustomButton type="submit" fullWidth>
            Avançar
          </CustomButton>
        </Box>
      </Card>
    </VerifyNumberContainer>
  );
}