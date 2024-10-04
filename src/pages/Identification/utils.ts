export const educationClasses: Record<string, string[]> = {
  'Sem escolaridade': [],
  'Fundamental I (1ª a 4ª série)': [
    '1º ano',
    '2º ano',
    '3º ano',
    '4º ano',
    '5º ano',
  ],
  'Fundamental II (5ª a 8ª série)': ['6º ano', '7º ano', '8º ano', '9º ano'],
  'Médio (antigo 2º grau)': ['1º ano', '2º ano', '3º ano'],
  'Superior incompleto': [],
  'Superior completo': [],
  'Não se aplica': [],
};

export const disabledFields = [
  'identification.maritalStatus', // Disabled in Identification component
  'identification.susCard', // Disabled in Identification component
  'identification.education', // Disabled in Identification component
  'identification.class', // Disabled in Identification component
  'doctor.city', // Disabled in Doctor component
  'external.occurenceAddress.number', // Disabled in External component
  'external.occurenceAddress.street', // Disabled in External component
  'external.occurenceAddress.neighborhood', // Disabled in External component
  'external.occurenceAddress.city', // Disabled in External component
  'external.occurenceAddress.state', // Disabled in External component
];
