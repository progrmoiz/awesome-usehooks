# useLocalStorage
A simple hook for using local storage in a React TypeScript application.

## Installation
No installation is required. Simply copy and paste the hook into your project.

## Usage
Import the hook and call it in your component:

```ts
import { useLocalStorage } from './useLocalStorage';

const MyComponent = () => {
  const [value, setValue] = useLocalStorage('myKey', 'initialValue');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
    </div>
  );
};
```

This component will render an input field that is persisted in local storage using the `myKey` key. The initial value will be `'initialValue'`. Every time the value of the input field is changed, the new value will be stored in local storage using the `setValue` function.

## API
The `useLocalStorage` hook returns an array with two elements:

- The current value stored in local storage for the given key.
- A function for updating the value.

```
const [value, setValue] = useLocalStorage(key: string, initialValue: T): [T, (value: T) => void]
```

## License
This project is licensed under the MIT License.

## Note
This hook includes a check to see if the window object exists before using it. If the window object does not exist (e.g. because the code is running on the server in a server-side rendering scenario), the hook will return the initial value and a no-op function for updating the value. This ensures that the hook will work in all environments without throwing an error.

## Code

```
import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const hasWindow = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (hasWindow) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      if (hasWindow) {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (hasWindow) {
      const storageEventHandler = (e: StorageEvent) => {
        if (e.storageArea === window.localStorage && e.key === key) {
          setStoredValue(JSON.parse(e.newValue!));
        }
      };
      window.addEventListener('storage', storageEventHandler);
      return () => {
        window.removeEventListener('storage', storageEventHandler);
      };
    }
  }, [key]);

  return [storedValue, setValue];
};
```
