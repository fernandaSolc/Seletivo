import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppTheme from "../cadastroAluno/shared-theme/AppTheme";
import ColorModeSelect from "../cadastroAluno/shared-theme/ColorModeSelect";
import { SitemarkIcon } from "../cadastroAluno/CustomIcons";

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
  backgroundColor: "#F4F4F4",
  overflowY: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#F4F4F4",
  },
  [theme.breakpoints.up("sm")]: {
    width: "550px",
    height: "auto",
    minHeight: "400px",
    maxHeight: "500px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const VerifyEmailContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function VerifyEmail(props: { disableCustomTheme?: boolean }) {
  const [emailOtp, setEmailOtp] = React.useState(["", "", "", "", "", ""]);
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Aceita apenas números

    const newEmailOtp = [...emailOtp];
    newEmailOtp[index] = value;
    setEmailOtp(newEmailOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus(); // Move para o próximo input
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !emailOtp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus(); // Volta para o anterior se estiver vazio
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fullEmailOtp = emailOtp.join("");
    if (fullEmailOtp.length === 6) {
      navigate("/verify-number");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <ColorModeSelect />
      </Box>
      <VerifyEmailContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <FormLabel>Verifique seu email</FormLabel>
              <Stack direction="row" spacing={1}>
                {emailOtp.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputsRef.current[index] = el)}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
                    variant="outlined"
                    size="small"
                    inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "20px", width: "40px" } }}
                  />
                ))}
              </Stack>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ backgroundColor: "#8C44FF", "&:hover": { backgroundColor: "#7A3CE0" } }}
            >
              Verificar
            </Button>
          </Box>
        </Card>
      </VerifyEmailContainer>
    </AppTheme>
  );
}
