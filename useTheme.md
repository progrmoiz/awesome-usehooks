# useTheme

A simple hook for managing a theme in a React TypeScript application.

## Installation

No installation is required. Simply copy and paste the hook into your project.

## Usage

Import the hook and call it in your component:

```ts
import { useTheme } from './useTheme';

const MyComponent = () => {
  const [theme, toggleTheme] = useTheme('light');

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <div>
      <button onClick={handleClick}>Toggle theme</button>
      <p>Current theme: {theme}</p>
    </div>
  );
};
```


This component will render a button that allows you to toggle between a light and a dark theme, and a paragraph that displays the current theme. The theme will be persisted in local storage using the `theme` key, so it will be remembered across page refreshes.

## API

The `useTheme` hook returns an array with two elements:

- The current theme.
- A function for toggling the theme.

```ts
const [theme, toggleTheme] = useTheme(initialTheme: Theme): [Theme, () => void]
```
