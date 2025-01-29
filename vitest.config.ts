/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: "node",
    setupFiles: ['./src/test/setup.ts']
  },
});
