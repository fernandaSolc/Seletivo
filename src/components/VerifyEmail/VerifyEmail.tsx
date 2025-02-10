// VerifyEmail.tsx
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

const VerifyEmailContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));

export default function VerifyEmail() {
  const [emailOtp, setEmailOtp] = React.useState(["", "", "", "", "", ""]);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Aceita somente dígitos
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
    <>
      <CssBaseline />
      <VerifyEmailContainer direction="column" justifyContent="center">
        <Card>
          <h2>Verifique seu Email</h2>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
          >
            <FormControl sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FormLabel>Código OTP</FormLabel>
              <Stack direction="row" spacing={1}>
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
                      style: { textAlign: "center", fontSize: "20px", width: "40px" },
                    }}
                  />
                ))}
              </Stack>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Verificar
            </Button>
          </Box>
        </Card>
      </VerifyEmailContainer>
    </>
  );
}