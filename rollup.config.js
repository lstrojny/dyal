import typescript from 'rollup-plugin-typescript';
import { uglify } from "rollup-plugin-uglify";

export default {
    output: {
        name: 'DYAL',
        file: 'dist/loader.js',
        format: 'iife'
    },
    input: './src/loader.ts',
    plugins: [typescript(), uglify()]
}
