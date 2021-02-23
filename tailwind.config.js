module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      poppins: 'Poppins, sans-serif',
      roboto: 'Roboto, sans-serif'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
