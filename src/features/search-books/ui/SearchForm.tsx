import { useUnit } from 'effector-react';
import { $query, queryChanged } from 'shared/store/store.ts';

export const SearchForm = () => {
  const [query, onQueryChange] = useUnit([$query, queryChanged]);

  return (
    <div>
      <input
        onChange={(e) => onQueryChange(e.target.value)}
        type="text"
        value={query}
      />
    </div>
  );
};
