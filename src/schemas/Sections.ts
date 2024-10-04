import { z } from 'zod';

const yesNoSchema = z.enum(['Sim', 'Não', 'Não se aplica']);

const addressSchema = z.object({
  cep: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  uf: z.string(),
  street: z.string(),
});

const identificationSchema = z.object({
  typeOfDeath: z.enum(['Fetal', 'Não fetal']),
  dateOfDeath: z.string(),
  hourOfDeath: z.string(),
  deceasedName: z.string(),
  mothersName: z.string(),
  fathersName: z.string().optional(),
  naturalness: z.string(),
  dateOfBirth: z.string(),
  age: z.string(),
  sex: z.enum(['M', 'F', 'I']),
  race: z.enum([
    'Branca',
    'Preta',
    'Amarela',
    'Parda',
    'Indígena',
    'Não se aplica',
  ]),
  maritalStatus: z.enum([
    'Solteiro(a)',
    'Casado(a)',
    'Divorciado(a)',
    'Viúvo(a)',
    'Separado(a)',
    'Não se aplica',
  ]),
  susCard: z.string(),
  education: z.enum([
    'Sem escolaridade',
    'Fundamental I (1ª a 4ª série)',
    'Fundamental II (5ª a 8ª série)',
    'Médio (antigo 2º grau)',
    'Superior incompleto',
    'Superior completo',
    'Não se aplica',
  ]),
  class: z.string(),
  occupation: z.string(),
  cbo: z.string(),
  deceasedAddress: addressSchema,
});

const occurrenceSchema = z.object({
  address: addressSchema,
  cnes: z.string(),
  establishmentName: z.string(),
  hospitalAddress: addressSchema,
  placeType: z.enum([
    'Hospital',
    'Outro estabelecimento de saúde',
    'Via pública',
    'Domicílio',
    'Outros',
    'Não se aplica',
  ]),
});

const infantSchema = z.object({
  mothersAge: z.string().optional(),
  mothersEducation: z.string().optional(),
  mothersClass: z.string().optional(),
  mothersOccupation: z.string().optional(),
  bornAlive: z.boolean().optional(),
  fetalLoss: z.string().optional(),
  weeksPregnant: z.string().optional(),
  pregnancyType: z.string().optional(),
  birthType: z.string().optional(),
  birthWeight: z.string().optional(),
  deathRelativeToBirth: z.string().optional(),
  birthCertificateNumber: z.string().optional(),
});

const conditionsSchema = z.object({
  fetileAgeDeath: z.string().optional(),
  receivedMedicalAssistance: z.string(),
  necropsy: yesNoSchema,
  cause1: z.string(),
  evolutionTime1: z.string(),
  cid1: z.string(),
  cause2: z.string().optional(),
  evolutionTime2: z.string().optional(),
  cid2: z.string().optional(),
  cause3: z.string().optional(),
  evolutionTime3: z.string().optional(),
  cid3: z.string().optional(),
  cause4: z.string().optional(),
  evolutionTime4: z.string().optional(),
  cid4: z.string().optional(),
  cause5: z.string().optional(),
  evolutionTime5: z.string().optional(),
  cid5: z.string().optional(),
});

const doctorSchema = z.object({
  name: z.string(),
  crm: z.string(),
  confirmedBy: z.enum([
    'Assistente',
    'Substituto',
    'IML',
    'SVO',
    'Outro',
    'Não se aplica',
  ]),
  city: z.string(),
  contact: z.string(),
  confirmationDate: z.string(),
});

const externalSchema = z.object({
  nonNaturalType: z.enum([
    'Acidente',
    'Suicídio',
    'Homicídio',
    'Outros',
    'Não se aplica',
  ]),
  workplaceAccident: yesNoSchema,
  informationSource: z.enum([
    'Boletim de Ocorrência',
    'Hospital',
    'Família',
    'Outros',
    'Não se aplica',
  ]),
  placeType: z.enum([
    'Via pública',
    'Endereço de residência',
    'Outro domicílio',
    'Estabelecimento comercial',
    'Outros',
    'Não se aplica',
  ]),
  occurrenceNumber: z.string().optional(),
  occurrenceDescription: z.string().optional(),
  occurrenceAddress: addressSchema.optional(),
});

const formSchema = z.object({
  identification: identificationSchema,
  occurrence: occurrenceSchema,
  infant: infantSchema.optional(),
  conditions: conditionsSchema,
  doctor: doctorSchema,
  external: externalSchema,
});

export default formSchema;
