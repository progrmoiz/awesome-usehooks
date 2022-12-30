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

## Advanced code
```ts
import { useState } from 'react';

interface FormValues {
  [key: string]: string | boolean;
}

type ValidationRule = (value: string) => string | undefined;

interface ValidationRules {
  [key: string]: ValidationRule[];
}

const useForm = (initialValues: FormValues, validationRules: ValidationRules): [FormValues, boolean, (event: React.FormEvent<HTMLFormElement>) => void, (event: React.ChangeEvent<HTMLInputElement>) => void, Record<string, string>] => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(validateForm(values, validationRules));
    setIsSubmitting(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    }));
  };

  return [values, isSubmitting, handleSubmit, handleChange, errors];
};

const validateForm = (values: FormValues, validationRules: ValidationRules): Record<string, string> => {
  const errors: Record<string, string> = {};
  Object.keys(validationRules).forEach(key => {
    const value = values[key];
    const rules = validationRules[key];
    rules.forEach(rule => {
      const error = rule(value);
      if (error) {
        errors[key] = error;
      }
    });
  });
  return errors;
};
```
