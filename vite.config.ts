import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'src/public/*',
                    dest: ''
                }
            ]
        })
    ],
    build: {
        target: 'esnext',
        rollupOptions: {
            input: './src/index.html',
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
                dir: 'dist',
            },
        },
    },
})