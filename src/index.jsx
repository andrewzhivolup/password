import { initializeLanguage } from '@utils/initializeLanguage.js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './i18n';
import './index.scss';

initializeLanguage();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
