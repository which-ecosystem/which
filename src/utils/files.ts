import Compressor from 'compressorjs';


export const getLocalFileUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') resolve(reader.result);
    }, false);

    reader.addEventListener('error', () => {
      reject(new Error('Error reading the file'))
    }, false );

    if (file) reader.readAsDataURL(file);
  });
};

export const compressFile = (file: File, quality = 0.6): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    return new Compressor(file, {
      success: result => resolve(result),
      error: err => reject(err),
      quality
    });
  });
};

