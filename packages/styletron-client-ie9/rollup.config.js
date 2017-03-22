import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/styletron-client-ie9.js',
  targets: [
    { dest: 'dist/bundle.cjs.js', format: 'cjs'},
    { dest: 'dist/bundle.es.js', format: 'es'}
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    buble()
  ]
};
