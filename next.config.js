const isProd = process.env.NODE_ENV === 'production';
const repo = 'Forgepass-frontend'; // repo name, exact case

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
};
