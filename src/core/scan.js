import fs from 'fs';
import path from 'path';

const scan = (dirname, fn) => {
  fs.readdirSync(dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      fn(path.join(dirname, file), file.split('.')[0]);
    });
};

export default scan;
