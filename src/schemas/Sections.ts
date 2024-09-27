import { z } from 'zod';

const yesNoSchema = z.enum(['Sim', 'Não', 'Não se aplica']);

const addressSchema = z.object({
  cep: z.string(),
  number: z.string(),
  complement: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.string(),
  street: z.string(),
});

const causeOfDeathSchema = z.object({
  cause: z.string(),
  time: z.string(),
  CID: z.string(),
});

const formSchema = z.object({
  //Identification
  typeOfDeath: z.enum(['Fetal', 'Não fetal']),
  dateOfDeath: z.string(),
  hourOfDeath: z.string(),
  deceasedName: z.string(),
  mothersName: z.string(),
  fathersName: z.string(),
  naturalness: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  sex: z.enum(['M', 'F', 'I']),
  race: z.enum(['Branca', 'Preta', 'Amarela', 'Parda', 'Indígena']),
  maritalStatus: z.enum([
    'Solteiro(a)',
    'Casado(a)',
    'Divorciado(a)',
    'Viúvo(a)',
    'Separado(a)',
  ]),
  susCard: z.string(),
  schooling: z.number().int().min(0).max(9),
  occupation: z.string(),
  cbo: z.string(),
  deceasedAddress: addressSchema,
  // Occurence and Death
  deathPlace: addressSchema,
  deathPlaceType: z.string(),
  medicalAssistance: yesNoSchema,
  confirmedThrough: z.array(
    z.enum([
      'Exame clínico',
      'Exame laboratorial',
      'Exame de imagem',
      'Exame de necropsia',
    ]),
  ),
  // Assorted
  codeClass: z.string(),
  local: z.string(),
  establishment: z.string(),
  cnes: z.string(),
  hospitalAddress: addressSchema,
  deathOccurred: z.string(),
  assistance: z.string(),
  causes: z.array(causeOfDeathSchema).length(4),
  extraCauses: z.array(causeOfDeathSchema).length(2),
  //Infant and Pregnancy
  motherAge: z.string(),
  education: z.string(),
  class: z.string().optional(),
  bornAlive: z.boolean(),
  fetalLoss: z.string(),
  weeksGestation: z.string(),
  pregnancy: z.string(),
  birthWeightValue: z.string(),
  childBirth: z.string(),
  deathInChildbirth: z.string(),
  liveCertificate: z.string(),
  // Hospital and Doctor
  doctorName: z.string(),
  CRM: z.string(),
  assistedDeceased: z.enum([
    'Sim',
    'Não',
    'Substituto',
    'IML',
    'SVO',
    'Outros',
  ]),
  contact: z.string(),
  noteDate: z.string(),
  // External Causes
  deathFrom: z.enum([
    'Acidente',
    'Suicídio',
    'Homicídio',
    'Outros',
    'Não se aplica',
  ]),
  workAccident: yesNoSchema,
  informationSource: z.enum([
    'Boletim de Ocorrência',
    'Hospital',
    'Família',
    'Outros',
    'Não se aplica',
  ]),
  occurrenceDescription: z.string(),
  occurrenceAddress: addressSchema,
  // No doctor
  declarantName: z.string(),
  testimony: z.array(z.string()).length(2),
});

export default formSchema;
