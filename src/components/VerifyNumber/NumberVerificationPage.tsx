import * as React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";

export default function NumberVerificationPage() {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [error, setError] = React.useState("");

  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^\d{10,11}$/; // Aceita apenas números com 10 ou 11 dígitos
    return phoneRegex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber) {
      setError("O número de celular é obrigatório.");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Digite um número de celular válido (com DDD).");
      return;
    }

    setError("");
    console.log("Número enviado:", phoneNumber);
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
        
        <Typography
            variant="caption"
            color="textSecondary"
            sx={{ mb: 3, display: "block" }}
        >
        Estamos quase lá! Agora vamos precisar repetir o processo para verificarmos seu número de telefone.
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
            Número de Celular*
          </Typography>

          <TextField
            fullWidth
            placeholder="(DDD) 98888-8888"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))} // remove caracteres não numéricos
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />

          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ mb: 3, display: "block" }}
          >
            Enviaremos um código de verificação de 6 dígitos para este número se ele corresponder ao número cadastrado anteriormente.
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
