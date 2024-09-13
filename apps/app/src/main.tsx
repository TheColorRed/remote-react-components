import { set } from '@ecp/rtc/client';
import { createRoot } from 'react-dom/client';
import App from './App.js';

set('common', 'http://localhost:3000/common/common.mjs');
set('shapes', 'http://localhost:3000/common/shapes.mjs');

const root = createRoot(document.getElementById('root') ?? document.body);
root.render(<App />);
