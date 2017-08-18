import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/main.js',
  format: 'iife',
  plugins: [
    babel(),
    resolve({ jsnext: true }),
    commonjs()
  ],
  dest: 'public/bundle.js',
};