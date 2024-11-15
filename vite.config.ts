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
                entryFileNames: 'src/[name].js',
                chunkFileNames: 'src/[name].js',
                assetFileNames: 'src/[name].[ext]',
                dir: 'dist',
            },
        },
    },
})