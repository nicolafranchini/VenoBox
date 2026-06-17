// rollup.config.js
import terser from '@rollup/plugin-terser';
export default {
  input: 'src/venobox.esm.js', // Percorso corretto del sorgente
  output: [
    { 
      file: "dist/venobox.js", 
      format: 'umd', 
      name: 'VenoBox',
      exports: 'default' // Utile per esportazione corretta in UMD
    },
    { 
      file: "dist/venobox.min.js", 
      format: 'umd',
      name: 'VenoBox',
      sourcemap: true,
      exports: 'default',
      plugins: [
        terser()
      ],  
    },
  ],
  treeshake: { moduleSideEffects: false }
};