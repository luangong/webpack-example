/* eslint-disable no-console */
import { createRoot } from 'react-dom/client';
import Button from './components/Button';

import add from './utils/add';
// import App from './pages/_app';

import './styles/global.css';
import './styles/foo.scss';
import './styles/bar.less';

console.log(add(1, 2));

// TODO: Handle routing and pass the specified page component to App
// createRoot(document.getElementById('root')!).render(<App />);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <>
    <h2>Hello, React!</h2>
    <Button text="OK" />
    <Button text="Cancel" />
  </>,
);
