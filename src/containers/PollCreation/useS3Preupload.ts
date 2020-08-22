import { useState, useCallback, useMemo } from 'react';
import uploadFileToS3 from '../../utils/uploadFileToS3';


interface Hook {
  setValue: (value: File | string | undefined) => void;
  isReady: boolean;
  resolve: () => Promise<string>;
  progress: number;
}

export default (): Hook => {
  const [url, setUrl] = useState<string>();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);

  const isReady = useMemo(() => Boolean(file || url), [file, url]);

  const setValue: Hook['setValue'] = useCallback(value => {
    if (value instanceof File) {
      setFile(value);
      setUrl(undefined);
    } else {
      setUrl(value);
      setFile(undefined);
    }
  }, [setUrl, setFile]);

  const resolve = useCallback(async (quality?: number): Promise<string> => {
    if (file) return uploadFileToS3(file, quality, setProgress);
    return url || '';
  }, [file, url]);

  return {
    setValue,
    isReady,
    resolve,
    progress
  };
};
