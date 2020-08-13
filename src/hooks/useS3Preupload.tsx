import { useState, useCallback, useMemo } from 'react';
import { get } from '../requests';
import axios from 'axios';


export default () => {
  const [url, setUrl] = useState<string>();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);

  const isReady = useMemo(() => Boolean(file || url), [file, url]);


  console.log({ file, url })

  const setValue = useCallback((value: File | string | undefined): void => {
    if (value instanceof File) {
      setFile(value);
      setUrl(undefined);
    } else {
      setUrl(value);
      setFile(undefined);
    }
  }, [setUrl, setFile]);

  const handleUploadProgress = useCallback((progressEvent: any) => {
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
          const { config: { url } } = response;
          return url ? url.slice(0, url.indexOf('?')) : '';
        });
    } else return url || '';
  }, [file, handleUploadProgress, url]);

  return { setValue, isReady, resolve, progress };
};
