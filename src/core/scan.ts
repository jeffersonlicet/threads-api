import fs from 'fs';
import path from 'path';

const scan = (dirname: string, fn: Function) => {
  fs.readdirSync(dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.ts'))
    .forEach((file) => {
      fn(path.join(dirname, file), file.split('.')[0]);
    });
};

export default scan;
