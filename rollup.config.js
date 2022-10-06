import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';

const rollupPlugins = [
  typescript(),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  commonjs({
    transformMixedEsModules: true,
  }),
  json(),
];

const rollupOutputs = (name) => [
  {
    input: `src/${name}`,
    external: [
      /node_modules/
    ],
    output: [
      {
        file: `dist/${name}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `dist/${name}.mjs`,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx', '.mjs', '.js']
      }),
      ...rollupPlugins
    ],
  },{
    input: `src/${name}`,
    external: [
      /node_modules/
    ],
    output: [
      {
        file: `dist/${name}.d.ts`,
        format: 'es',
      },
    ],
    plugins: [
      resolve({
        extensions: ['.ts', '.tsx', '.mjs', '.js']
      }),
      dts()
    ],
  },
];

export default [
  ...rollupOutputs('index'),
  ...rollupOutputs('client'),
];