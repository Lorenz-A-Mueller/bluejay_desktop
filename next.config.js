const withPWA = require('next-pwa');

module.exports = {
  reactStrictMode: true,
};

module.exports = withPWA({
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
