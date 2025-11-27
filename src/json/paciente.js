const patientData = {
  nomeCompleto: formData.nomeCompleto,
  email: formData.email,
  cep: formData.cep,
  cidade: formData.cidade,
  telefone: formData.telefone,
  registrationDate: new Date().toISOString(), 
  registeredBy: userId,
};