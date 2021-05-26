module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
        displayName: process.env.NODE_ENV !== 'production',
      },
    ],
  ],
};
