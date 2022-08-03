import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.schema';

@Injectable()
export class ImagesService {
  async getTextFromImage(file: Express.Multer.File) {
    const path = file.filename;
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient({
      keyFilename: process.env.KEY_FILE_NAME,
    });
    const [result] = await client.textDetection(`${path}`);

    const labels = result.textAnnotations;
    labels.forEach((label) => console.log(label.description));
    return await labels;
  }

  async getTextFromAws(key: String) {
    const path = key;
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient({
      keyFilename: process.env.KEY_FILE_NAME,
    });
    const [result] = await client.textDetection(`${path}`);

    const labels = result.textAnnotations;
    labels.forEach((label) => console.log(label.description));
    return await labels;
  }
}
