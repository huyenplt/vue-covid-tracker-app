module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'color1': '#AAC9CE',
        'color2': '#B6B4C2',
        'color3': '#C9BBC8',
      },
    },
    container: {
      center: true,
      padding: '10 rem',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
