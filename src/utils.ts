import fs from 'fs';

/**
 * check if dir exists
 * if dir not found - create
 * @param path path to dir
 */
export function checkOrCreateDir(path: string): void {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path, { recursive: true });
  }
}
