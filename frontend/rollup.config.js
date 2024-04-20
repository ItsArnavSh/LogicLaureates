import svelte from 'rollup-plugin-svelte';
import replace from '@rollup/plugin-replace';
import { config } from 'dotenv';

config();

const production = !process.env.ROLLUP_WATCH;

export default {
  plugins: [
    svelte({
    }),
    replace({
      preventAssignment: true,
      values: {
        'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
      },
    }),
  ],
};
