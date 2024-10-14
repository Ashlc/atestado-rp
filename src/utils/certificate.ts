import { Font } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { barcodes, image, text } from '@pdfme/schemas';
import CourierPrime from '../assets/fonts/CourierPrime.ttf';
import templateSchema from './templateSchemas.json';

const font: Font = {
  courier: {
    data: await (async () => {
      const response = await fetch(CourierPrime);
      return response.arrayBuffer();
    })(),
    fallback: true,
  },
};

class Certificate {
  formData: Record<string, unknown> | null;

  constructor(formData: Record<string, unknown> | null) {
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

  async pdf(input: Record<string, unknown>) {
    'use server';

    const basePdfBuffer = await this.loadBasePdf();

    const template = {
      schemas: templateSchema,
      basePdf: basePdfBuffer,
      pdfmeVersion: '5.0.0',
    };

    const plugins = { text, image, qrcode: barcodes.qrcode };

    const pdf = await generate({
      template,
      inputs: [input],
      plugins,
      options: { font },
    });

    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));
  }
}

export default Certificate;
