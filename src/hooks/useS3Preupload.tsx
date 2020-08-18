/* eslint-disable */
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
    // Only allow upload progress reach 95%, and set 100% when request is resolved
    setProgress(Math.round((progressEvent.loaded * 95) / progressEvent.total));
  }, [setProgress]);

  const resolve = useCallback(async (): Promise<string> => {
    if (file) {
      const config = {
        headers: { 'Content-Type': 'image/png' },
        onUploadProgress: handleUploadProgress
      };

      setProgress(0.01);
      return get('/files')
        .then(function(response){
          console.log({'resData': response.data});
          debugger;
          return response.data;
        })
        .then(function(uploadUrl){
          console.log({'uploadUrl': uploadUrl});
          return axios.put(uploadUrl, file, config);
        })
        .then(function(response){
          setProgress(100);
          const uri = response.config.url;
          console.log({'uri': uri?.slice(0, uri.indexOf('?'))});
          return uri ? uri.slice(0, uri.indexOf('?')) : '';
        });
    }
    setProgress(100);
    console.log({'url': url});
    return url || '';
  }, [file, handleUploadProgress, url]);

  return {
    setValue,
    isReady,
    resolve,
    progress
  };
};
