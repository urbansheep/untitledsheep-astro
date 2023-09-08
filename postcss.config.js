import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';

const settings = {
    plugins: [
        autoprefixer(),
        postcssPresetEnv({ stage: 1 }),
        cssnano({ preset: 'default' }),
    ],
};

export default settings;