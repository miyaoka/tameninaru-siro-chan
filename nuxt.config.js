require('dotenv').config()

const siroChannelId = 'UCLhUvJ_wO9hOvv_yYENu4fQ'

module.exports = {
  css: ['~/assets/css/reset.scss', '~/assets/css/base.scss'],
  modules: [
    [
      '~/modules/youtubeSearch',
      {
        channelId: siroChannelId,
        key: process.env.YOUTUBE_API_KEY
      }
    ]
  ],

  /*
  ** Headers of the page
  */
  head: {
    title: 'tameninaru-siro-chan',
    titleTemplate: 'tameninaru-siro-chan - %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
