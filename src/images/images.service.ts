import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.schema';

@Injectable()
export class ImagesService {
  async getTextFromImage(file: Array<Express.Multer.File>) {
    const path = `dist/common/uploads/Image/${file[0].filename}`;
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient({
      keyFilename: process.env.KEY_FILE_NAME,
    });
    const [result] = await client.textDetection(`${path}`);

    const labels = result.textAnnotations;
    //console.log(labels);
    var data = '';
    labels.forEach((label) => {
      data += label.description;
      //console.log(data);
      //console.log(label.description);
    });

    data = data.slice(0, data.length / 2);
    data = data.replace(/\n|\s|[0-9]|g|mg/g, '');
    var dataArr: string[];
    dataArr = data.split(/[",", ".","(",")", ":",";", "%", " "]/);
    //console.log(dataArr);
    return await dataArr;
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
