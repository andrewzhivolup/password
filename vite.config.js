import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

//eslint-disable-next-line
const appVersion = JSON.stringify(process.env.npm_package_version);

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        __APP_VERSION__: appVersion,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@store': path.resolve(__dirname, './src/store'),
            '@utils': path.resolve(__dirname, './src/utils'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    base: '/passwordgenerator',
});
