import fs from 'fs';
import path from 'path';

export default function parseFile(filepath) {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const extname = path.extname(absolutePath);

  const content = fs.readFileSync(absolutePath, 'utf-8');

  switch (extname) {
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error(`Unsupported file format: ${extname}`);
  }
}
