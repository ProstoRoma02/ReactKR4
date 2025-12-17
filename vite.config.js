import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Пробуем без базового пути
const base = '/';

export default defineConfig({
  base,
  plugins: [react()],
});

