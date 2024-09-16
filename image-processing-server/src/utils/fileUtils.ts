import fs from 'fs';

export const removeTempFile = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) console.log(`Failed to delete file: ${path}`);
  });
};
