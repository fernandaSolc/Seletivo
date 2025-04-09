import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";

export default function EmailVerificationPage() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("O e-mail é obrigatório.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Digite um e-mail válido.");
      return;
    }

    setError("");
    console.log("E-mail enviado:", email);
    // Aqui você pode chamar a API para envio do código
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="src/assets/Logo.png" // ajuste o caminho da imagem
          alt="Logo Projeto Desenvolve"
          style={{ width: 100, marginBottom: 24 }}
        />

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Verificação de 2 Etapas
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", mt: 2 }}
        >
          <Typography
            variant="body1"
            fontWeight="medium"
            gutterBottom
            sx={{ mb: 1 }}
          >
            E-mail*
          </Typography>

          <TextField
            fullWidth
            placeholder="E-mail"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />

          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ mb: 3, display: "block" }}
          >
            Enviaremos um código de verificação de 6 dígitos a este e-mail se
            corresponder ao e-mail cadastrado anteriormente.
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#8C44FF",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              py: 1.5,
              "&:hover": {
                backgroundColor: "#732ddc",
              },
            }}
          >
            Avançar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
