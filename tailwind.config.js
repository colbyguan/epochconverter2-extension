module.exports = {
  purge: ['./src/**/*.js', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      borderWidth: ['hover', 'focus'],
      scale: ['group-hover']
    },
  },
  plugins: [],
}
