import { z } from 'zod';
import { text, image, barcodes } from '@pdfme/schemas';
import { generate } from '@pdfme/generator';

import formSchema from '../schemas/Sections';
import templateSchema from './templateSchemas.json';

type formType = z.infer<typeof formSchema>;

class Certificate {
  formData: formType | null;

  constructor(formData: formType | null) {
    this.formData = formData;
  }

  json() {
    return this.formData;
  }

  async loadBasePdf() {
    'use server';

    const response = await fetch('/basePdf.pdf');
    if (!response.ok) {
      throw new Error('Erro ao carregar o PDF base');
    }
    const data = await response.arrayBuffer();

    return data; // Retorna como ArrayBuffer
  }

  async pdf() {
    'use server';

    const basePdfBuffer = await this.loadBasePdf();
    console.log(basePdfBuffer);

    const template = {
      schemas: templateSchema,
      basePdf: basePdfBuffer,
      pdfmeVersion: '5.0.0',
    };

    const plugins = { text, image, qrcode: barcodes.qrcode };
    const inputs = [
      {
        deceasedName: 'Teste',
        fathersName: 'Teste',
        mothersName: 'Teste',
        typeOfDeathNonFetal: 'x',
        typeOfDeathFetal: '',
        dateOfDeath: '18012005',
        hourOfDeath: '18:00',
        naturalness: 'Brasileiro',
        dateOfBirth: '18012005',
        age: '19',
        ageIgnored: '',
        solteiro: 'x',
        casado: '',
        viuvo: '',
        maritalStatusIgnored: '',
        separado: '',
        schooling0: '',
        schooling1: '',
        schooling2: '',
        schooling5: '',
        schooling3: '',
        schooling4: 'x',
        occupation: 'Ator',
        cbo: '18012',
        sexM: 'x',
        sexF: '',
        sexI: '',
      },
    ];

    const pdf = await generate({ template, plugins, inputs });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  }
}

export default Certificate;
