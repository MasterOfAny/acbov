import { defineConfig } from 'vite'
export default defineConfig({
    build: {
        target: 'esnext',
        rollupOptions: {
            input: {
                app: './src/index.html', // default
            },
        },
    },
})