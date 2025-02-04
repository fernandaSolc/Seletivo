export const validateRegistrationData = (data: any) => {
  const errors: any = {};

  // Validação do Nome
  if (!data.nome) {
    errors.nome = 'Nome é obrigatório.';
  }

  // Validação do CPF
  if (!data.cpf || data.cpf.length !== 11) {
    errors.cpf = 'CPF deve conter 11 dígitos.';
  }

  // Validação do E-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = 'Insira um e-mail válido.';
  }

  // Validação do Telefone
  if (!data.telefone || data.telefone.length < 12) {
    errors.telefone = 'O número de telefone deve ter pelo menos 12 dígitos.';
  }

  // Validação da Data de Nascimento
  if (!data.dataNascimento) {
    errors.dataNascimento = 'Data de nascimento é obrigatória.';
  }

  // Validação da Cidade
  if (!data.cidade) {
    errors.cidade = 'A cidade é obrigatória.';
  }

  // Validação do E-mail do Responsável
  const dobDate = new Date(data.dataNascimento);
  const age = new Date().getFullYear() - dobDate.getFullYear();
  if (age < 18 && (!data.emailResponsavel || !emailRegex.test(data.emailResponsavel))) {
    errors.emailResponsavel = 'O e-mail do responsável é obrigatório para menores de idade.';
  }

  return errors;
};
