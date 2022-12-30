# useForm

## Code
```ts
import { useState } from 'react';

const useForm = <T>(initialValues: T): [T, (event: React.FormEvent<HTMLFormElement>) => void, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [values, setValues] = useState<T>(initialValues);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return [values, handleSubmit, handleChange];
};
```
