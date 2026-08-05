import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ComponentShowcase } from './ComponentShowcase';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ComponentShowcase />
  </StrictMode>,
);
