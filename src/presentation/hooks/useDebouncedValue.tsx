import React, {useEffect, useState} from 'react';

export const useDebouncedValue = (input: string = '', time: number = 500) => {
  const [debouncedValue, setDevouncedValue] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDevouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debouncedValue;
};

export default useDebouncedValue;
