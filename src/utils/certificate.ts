import { generate } from '@pdfme/generator';
import { barcodes, image, text } from '@pdfme/schemas';
import { z } from 'zod';
import { mockInput } from './certificateInputExample';

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

    const response = await fetch('/template.pdf');
    if (!response.ok) {
      throw new Error('Erro ao carregar o PDF base');
    }
    const data = await response.arrayBuffer();

    return data;
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

    const pdf = await generate({
      template,
      inputs: mockInput,
      plugins,
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  }
}

export default Certificate;
