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

// Estilização do Card
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "600px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "0px 4px 31.1px 5px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  backgroundColor: theme.palette.background.paper,
}));

// Estilização do Container
const VerifyEmailContainer = styled(Stack)(({ theme }) => ({
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

export default function VerifyEmail() {
  const [emailOtp, setEmailOtp] = React.useState(["", "", "", "", "", ""]);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newEmailOtp = [...emailOtp];
    newEmailOtp[index] = value;
    setEmailOtp(newEmailOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !emailOtp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullOtp = emailOtp.join("");
    if (fullOtp.length === 6) {
      navigate("/success");
    } else {
      alert("Por favor, preencha os 6 dígitos do código.");
    }
  };

  return (
    <VerifyEmailContainer direction="column" justifyContent="center">
      <CssBaseline />
      <Card>
        {/* Logotipo */}
        <Box sx={{ mb: 2 }}>
          <img
            src="/src/assets/Logo.png"
            alt="Projeto Desenvolve"
            style={{ height: "60px" }}
          />
        </Box>

        {/* Título */}
        <Typography variant="h5" fontWeight="bold" align="center">
          Verifique seu Email
        </Typography>

        {/* Mensagem */}
        <Typography variant="body2" align="center">
          Verifique se há um código de verificação no email <strong>t*****@gmail.com.</strong>{" "}
          <CustomLink href="#">Mudar</CustomLink>
        </Typography>

        {/* Formulário */}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          <FormControl sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium" align="center" sx={{ mb: 1 }}>
              Código de 6 dígitos
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              {emailOtp.map((digit, index) => (
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

          {/* Botão "Verificar" */}
          <CustomButton type="submit" fullWidth>
            Verificar
          </CustomButton>
        </Box>
      </Card>
    </VerifyEmailContainer>
  );
}