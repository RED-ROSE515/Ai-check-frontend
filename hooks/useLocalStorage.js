// ----- hook:

import React, { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue = '') => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
           const item = window.localStorage.getItem('key') || defaultValue,
           return item ? JSON.parse(item) : defaultValue;
        } catch(error) {
            console.error(error);
            return defaultValue;
        }
    });

    const setValue = (value: T) => {
        try {
          setStoredValue(value);
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
          console.error(error);
        }
    };

    return [storedValue, setStoredValue] as const;
}


// usage 1

const [theme, setTheme] = useLocalStorage('theme', 'light');

return (
  <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle Theme
  </button>
);


// usage 2

export default function ComponentName() {
    const [name, setName] = useLocalStorage('name')

    const handleChange = event => setName(event.target.value);

    return (
        <div>
            <form>
                <label htmlFor="name">Name: </label>
                <input type="text" value={name} onChange={handleChange} id="name" />
            </form>
            {name ? <strong>Hi {name}</strong> : 'Please type your name'}
        </div>
    )
}
