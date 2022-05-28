import { createRoot } from 'react-dom/client';
import Button from './components/Button';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <>
    <h2>Hello, React!</h2>
    <Button text="OK" />
    <Button text="Cancel" />
  </>,
);
