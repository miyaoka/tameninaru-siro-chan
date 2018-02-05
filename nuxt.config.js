require('dotenv').config()
const nodeExternals = require('webpack-node-externals')

const siroChannelId = 'UCLhUvJ_wO9hOvv_yYENu4fQ'

const title = 'ためになるシロちゃんのミックス動画プレイヤー'
const desc = 'ためになるシロちゃんの動画をミックスするサイトです'

module.exports = {
  css: ['~/assets/css/reset.scss', '~/assets/css/base.scss'],
  modules: [
    ['@nuxtjs/google-analytics', { id: 'UA-3536169-18' }],

    [
      '~/modules/youtubeSearch',
      {
        channelId: siroChannelId,
        key: process.env.YOUTUBE_API_KEY
      }
    ]
  ],
  plugins: ['~/plugins/youtubeEmbed', '~/plugins/vue-awesome'],
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: (titleChunk) =>
      (titleChunk ? `${titleChunk} - ` : '') + 'ためになるシロちゃんのミックス動画プレイヤー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: desc
      },
      {
        property: 'og:title',
        content: title,
        hid: 'ogTitle'
      },
      { property: 'og:site_name', content: 'tameninaru-siro-chan' },
      { property: 'og:url', content: 'https://tameninaru-siro-chan.netlify.com', hid: 'ogUrl' },
      { property: 'og:type', content: 'article' },
      { property: 'og:locale', content: 'ja_JP' },
      {
        property: 'og:description',
        content: desc,
        hid: 'ogDesc'
      },
      {
        property: 'og:image',
        content: 'https://tameninaru-siro-chan.netlify.com/img/ogp-dolphin.jpg',
        hid: 'ogImage'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vue-awesome/]
          })
        ]
      }
    }
  }
}
