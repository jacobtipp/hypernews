import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/main.js',
  format: 'iife',
  plugins: [
    commonjs(),
    resolve({ jsnext: true }),
    babel({ exclude: 'node_modules/**' }),
  ],
  dest: 'public/bundle.js',
  external: ['firebase']
};