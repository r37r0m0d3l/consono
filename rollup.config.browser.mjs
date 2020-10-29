import autoExternal from "rollup-plugin-auto-external";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const INPUT_NAME = "index.browser.js";
const OUTPUT_NAME = "consono";

export default {
  input: `./src/${INPUT_NAME}`,
  output: [
    {
      file: `./dist/${OUTPUT_NAME}.browser.cjs`,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: `./dist/${OUTPUT_NAME}.browser.mjs`,
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    babel({ babelrc: true }),
    autoExternal(),
    resolve(),
    commonjs(),
    terser({
      keep_classnames: true,
      keep_fnames: true,
      output: {
        comments: false,
      },
      warnings: true,
    }),
  ],
  external: ["chalk"],
};
