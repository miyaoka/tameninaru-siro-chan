const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')
const { DateTime } = require('luxon')

const defaults = {
  exportPath: 'youtubeSearch.json',
  channelId: '',
  key: '',
  part: 'snippet',
  // order: 'date',
  type: 'video',
  maxResults: 50
}

const searchAPI = 'https://www.googleapis.com/youtube/v3/search'

const search = async (params) => {
  const result = await axios
    .get(searchAPI, {
      params
    })
    .catch((e) => null)

  return result && result.status === 200 ? result.data : null
}

const getData = async (options) => {
  let data
  let pageToken
  let items = []

  while ((data = await search({ ...options, pageToken }))) {
    items = [...items, ...data.items]
    pageToken = data.nextPageToken
    if (!pageToken) break
  }
  return items
}
module.exports = async function youtubeSearch(moduleOptions) {
  const options = Object.assign({}, defaults, this.options.youtubeSearch, moduleOptions)
  console.log(options, moduleOptions)

  const items = await getData(options)
  let idmap = {}
  items.map((item) => item.id.videoId).forEach((id) => (idmap[id] = idmap[id] ? idmap[id]++ : 1))
  console.log(idmap)
  const data = JSON.stringify(
    items.map((item) => {
      const {
        id: { videoId: id },
        snippet: { publishedAt, title, description, thumbnails: { medium: { url: thumbnail } } }
      } = item
      return {
        origin: item,
        id,
        publishedAt: DateTime.fromISO(publishedAt).valueOf(),
        title,
        description,
        thumbnail
      }
    })
  )

  this.extendBuild((config, { isClient, isServer }) => {
    fs.writeFileSync(path.resolve(path.join('static', options.exportPath)), data)
  })

  // this.options.build.plugins.push({
  //   apply(compiler) {
  //     compiler.plugin('emit', (compilation, cb) => {
  //       // This will generate `.nuxt/dist/info.txt' with contents of info variable.
  //       // Source can be buffer too
  //       compilation.assets['youtubeSearch.json'] = { source: () => data, size: () => data.length }

  //       cb()
  //     })
  //   }
  // })
}
