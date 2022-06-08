import path from 'path';
import fs from 'fs';

export default (filename) => {
  const filepath = path.resolve(process.cwd(), '__fixtures__', filename);
  const data = fs.readFileSync(filepath, 'utf-8');

  return data;
};
