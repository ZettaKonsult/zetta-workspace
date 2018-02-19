import { promisify } from 'util';
import fs from 'fs';

const readFileAsync = promisify(fs.readFile);

export default async () => await readFileAsync('./src/template.html', 'utf8');
