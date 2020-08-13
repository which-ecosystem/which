import { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { get } from '../requests';


interface ProgressEvent {
  loaded: number;
  total: number;
}

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

  const handleUploadProgress = useCallback((progressEvent: ProgressEvent): void => {
    setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
  }, [setProgress]);

  const resolve = useCallback(async (): Promise<string> => {
    if (file) {
      const config = {
        headers: { 'Content-Type': 'image/png' },
        onUploadProgress: handleUploadProgress
      };

      return get('/files')
        .then(response => response.data)
        .then(uploadUrl => axios.put(uploadUrl, file, config))
        .then(response => {
          const uri = response.config.url;
          return uri ? uri.slice(0, uri.indexOf('?')) : '';
        });
    }
    setProgress(100);
    return url || '';
  }, [file, handleUploadProgress, url]);

  return {
    setValue,
    isReady,
    resolve,
    progress
  };
};
