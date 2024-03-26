import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DebouncedApiCall = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== '') {
        axios
          .get(`https://api.github.com/search/repositories?q=${query}`)
          .then((response) => {
            setResults(response.data.items);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      } else {
        setResults([]); // Clear results if query is empty
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(delayDebounceFn); // Clear the timeout on cleanup
  }, [query]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search GitHub repositories"
      />
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <a href={result.html_url} target="_blank" rel="noopener noreferrer">
              {result.full_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebouncedApiCall;
