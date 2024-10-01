import { z } from 'zod';
import fs from "fs";
import type { Template } from '@pdfme/common';
import { generate } from '@pdfme/generator';

import formSchema from '../schemas/Sections';
import templateSchema from './templateSchemas.json';

type formType = z.infer<typeof formSchema>;

class Certificate {
  const basePdf = fs.readFileSync("assets/basePdf.pdf"); 
  formData: formType;

  constructor(formData: formType) {
    this.formData = formData;
  }

  json() {
    return this.formData;
  }

  pdf() {
    const template = {
      schemas: templateSchema,
      basePdf: 
    };
  }
}

export default Certificate;
