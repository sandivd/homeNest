module.exports = {
  jest: { configure: { resolver: "<rootDir>/jest.resolver.cjs" } },
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