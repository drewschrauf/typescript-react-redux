import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import markdown, { Mode } from 'vite-plugin-markdown';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [
    reactRefresh(),
    markdown({ mode: [Mode.HTML] }),
    vanillaExtractPlugin({ devStyleRuntime: 'vanilla-extract' }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
});
