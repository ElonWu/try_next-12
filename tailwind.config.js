const animationConfig = require('./tailwind.config.animation');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: animationConfig.keyframes,
      animation: animationConfig.animation,
    },
  },
  plugins: [],
  images: {
    // domains: ['i.scdn.co', 'images.unsplash.com'], // 允许的图片来源地址
  },
};
