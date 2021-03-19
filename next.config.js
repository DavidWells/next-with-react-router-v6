module.exports = {
  target: 'serverless',
  poweredByHeader: false,
  env: {
    SITE_NAME: 'foo',
  },
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
}
