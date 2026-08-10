import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { ComponentShowcase } from './ComponentShowcase';
import '../index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* MemoryRouter, not BrowserRouter: the showcase is an isolated component
        gallery, not a real navigable app — Navbar's real <Link>s just need
        *a* router context to render without crashing. */}
    <MemoryRouter>
      <ComponentShowcase />
    </MemoryRouter>
  </StrictMode>,
);
