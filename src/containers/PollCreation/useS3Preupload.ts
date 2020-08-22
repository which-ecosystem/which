import { useState, useCallback } from 'react';
import uploadFileToS3 from '../../utils/uploadFileToS3';

interface Hook {
  file: File | string | undefined;
  setFile: (value: File | string | undefined) => void;
  resolve: () => Promise<string>;
  progress: number;
}

export default (): Hook => {
  const [file, setFile] = useState<File | string>();
  const [progress, setProgress] = useState<number>(0);

  const resolve = useCallback(async (quality?: number): Promise<string> => {
    // Indicate start
    setProgress(0.01);

    if (file instanceof File) return uploadFileToS3(file, quality, setProgress);
    return file || '';
  }, [file]);

  return {
    file,
    setFile,
    resolve,
    progress
  };
};
