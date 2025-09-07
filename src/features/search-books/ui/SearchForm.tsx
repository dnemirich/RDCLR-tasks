import { useEffect, useRef, useState } from 'react';

type Props = {
  onSearch: (query: string, signal: AbortSignal) => void;
};

export const SearchForm = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('');
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(() => {
      if (controllerRef.current) {
        console.log('aborting previous request')
        controllerRef.current?.abort()
      }

      const controller = new AbortController();
      controllerRef.current = controller

      onSearch(query, controller.signal);

    }, 500)

    return () => clearTimeout(timeout);

  }, [query, onSearch]);

  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} type="text" value={query}/>
    </div>
  );
};
