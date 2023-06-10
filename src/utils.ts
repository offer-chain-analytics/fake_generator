import fs from 'fs';

export function checkOrCreateDir(path: string): void {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path, { recursive: true });
  }
}
