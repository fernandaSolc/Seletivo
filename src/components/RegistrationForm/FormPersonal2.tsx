import { Box, Button, Grid, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import StepProgressBar from "../ProgressBar/ProgressBar";

const CardContainer = styled('div')(({ theme }) => ({
    padding: "0px 50px 10px 50px",
    margin: 'auto',
    maxWidth: '600px',
    height: '80vh',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '16px 10px 10px 16px',
    boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    fontFamily:'Montserrat, sans-serif',
  
    // Scrollbar (WebKit)
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundcolor: theme.palette.text.primary,
      boxShadow: '0px 4px 31px rgba(0, 0, 0, 0.2)',
      borderRadius: '0px 10px 10px 10px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#D9D9D9',
      borderRadius: '16px 50px 50px 16px',
    },
    '&::-webkit-scrollbar-button': {
      display: 'none', // Deve funcionar para remover as setas
      height: 0,
      width: 0,
    },
  }));  

// Dados dinâmicos para os selects
const civilStatusOptions = [
    { value: 'solteiro', label: 'Solteiro(a)' },
    { value: 'casado', label: 'Casado(a)' },
    { value: 'divorciado', label: 'Divorciado(a)' },
    { value: 'viuvo', label: 'Viúvo(a)' },
    { value: 'uniao_estavel', label: 'União Estável' },
];

const educationOptions = [
    { value: 'fundamental_incompleto', label: 'Ensino Fundamental Incompleto' },
    { value: 'fundamental_completo', label: 'Ensino Fundamental Completo' },
    { value: 'medio_incompleto', label: 'Ensino Médio Incompleto' },
    { value: 'medio_completo', label: 'Ensino Médio Completo' },
    { value: 'superior_incompleto', label: 'Ensino Superior Incompleto' },
    { value: 'superior_completo', label: 'Ensino Superior Completo' },
    { value: 'pos_graduacao', label: 'Pós-graduação' },
];

const pcdOptions = [
    { value: 'nao', label: 'Não' },
    { value: 'sim_fisica', label: 'Deficiência Física' },
    { value: 'sim_visual', label: 'Deficiência Visual' },
    { value: 'sim_auditiva', label: 'Deficiência Auditiva' },
    { value: 'sim_mental', label: 'Deficiência Mental' },
    { value: 'sim_multipla', label: 'Deficiência Múltipla' },
];

export default function FormPersonal2() {
    const [profession, setProfession] = useState('');
    const [civilStatus, setCivilStatus] = useState('');
    const [familyCash, setFamilyCash] = useState('');
    const [education, setEducation] = useState('');
    const [pcd, setPcd] = useState('');

    return (
        <CardContainer sx={{ paddingTop: 1 }}>
            <StepProgressBar
                step={3}
                totalSteps={4}
                progressSx={{ backgroundColor: '', '& .MuiLinearProgress-bar': { backgroundColor: '#8C44FF' } }}
            />
            <Typography
                variant="h5"
                sx={{
                    fontWeight: '700',
                    fontFamily: 'Montserrat, Arial',
                    fontSize: '32px',
                    marginBottom: 3,
                }}
            >
                Complete seus Dados Pessoais
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={{ mb: 1 }}><strong>Profissão</strong></Typography>
                    <TextField
                        fullWidth
                        label="Informe sua profissão"
                        variant="outlined"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        required
                        sx={{ marginTop: '5px' }}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <Typography sx={{ mb: 1 }}><strong>Estado Civil*</strong></Typography>
                    <FormControl fullWidth required sx={{ marginTop: '5px' }}>
                        <InputLabel>Selecione seu estado civil</InputLabel>
                        <Select
                            value={civilStatus}
                            label="Selecione seu estado civil"
                            onChange={(e) => setCivilStatus(e.target.value)}
                        >
                            {civilStatusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{ mb: 1 }}><strong>Escolaridade*</strong></Typography>
                    <FormControl fullWidth required sx={{ marginTop: '5px' }}>
                        <InputLabel>Selecione sua escolaridade</InputLabel>
                        <Select
                            value={education}
                            label="Selecione sua escolaridade"
                            onChange={(e) => setEducation(e.target.value)}
                        >
                            {educationOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{ mb: 1 }}><strong>PCD*</strong></Typography>
                    <FormControl fullWidth required sx={{ marginTop: '5px' }}>
                        <InputLabel>Possui alguma deficiência?</InputLabel>
                        <Select
                            value={pcd}
                            label="Possui alguma deficiência?"
                            onChange={(e) => setPcd(e.target.value)}
                        >
                            {pcdOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{ mb: 1 }}><strong>Renda Familiar</strong></Typography>
                    <TextField
                        fullWidth
                        label="Renda Familiar*"
                        variant="outlined"
                        value={familyCash}
                        onChange={(e) => setFamilyCash(e.target.value)}
                        required
                        sx={{ marginTop: '5px' }}
                    />
                </Grid>
            </Grid>
            <Box sx={{
                pt:'10px',
                width:1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'end',
            }}>
            <Button type="submit" fullWidth variant="outlined" sx={{ borderRadius: '5px', width:0.2, backgroundColor: '#fff', mt:'15px'}}>
                Voltar
            </Button>
            <Button type="submit" fullWidth variant="contained" sx={{ borderRadius: '5px', width:0.2, backgroundColor: '#8C44FF', mt:'15px' }}>
                Próximo
            </Button>
    </Box>
        </CardContainer>
    );
}