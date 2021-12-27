/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  api: {
    bodyParser: {
      sizeLimit: '500k',
    },
  },
}
