import {useState, useEffect} from 'react';

function useDebounce(value: T, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;



// usage

const [searchTerm, setSearchTerm] = useState('');
const debounceSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debounceSearch) {
    // trigger API / other actions
  }
}, [debounceSearch]);
