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
    const response = await fetch('./assets/basePdf.pdf');
    if (!response.ok) {
      throw new Error('Erro ao carregar o PDF base');
    }
    return response.arrayBuffer(); // Retorna como ArrayBuffer
  }

  async pdf() {
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
        deceasedName: 'Cartorio',
        fathersName: 'Cartorio',
        mothersName: 'Cartorio',
        typeOfDeathNonFetal: 'x',
        typeOfDeathFetal: 'x',
        dateOfDeath: '18012005',
        hourOfDeath: '18:00',
        naturalness: 'Cartorio',
        dateOfBirth: '18012005',
        age: '19',
        ageIgnored: 'x',
        solteiro: 'x',
        casado: 'x',
        viuvo: 'x',
        maritalStatusIgnored: 'x',
        separado: 'x',
        schooling0: 'x',
        schooling1: 'x',
        schooling2: 'x',
        schooling5: 'x',
        schooling3: 'x',
        schooling4: 'x',
        occupation: 'Cartorio',
        cbo: '18012',
        sexM: 'x',
        sexF: 'x',
        sexI: 'x',
      },
    ];

    const pdf = await generate({ template, plugins, inputs });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  }
}

export default Certificate;
