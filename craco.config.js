module.exports = {
  style: {
    postcss: {
      // Use the modern postcssOptions format
      postcssOptions: { 
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  },
};