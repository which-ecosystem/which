export default (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') resolve(reader.result);
    }, false);

    reader.addEventListener('error', () => {
      reject(new Error('Error reading the file'));
    }, false);

    if (file) reader.readAsDataURL(file);
  });
};
