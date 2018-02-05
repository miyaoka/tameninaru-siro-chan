<template>
<div class="videList">
  <div
    v-for="item in videos"
    :key="item.id"
    class="videoListItem"
  >
    <div class="thumb">
      <a :href="`https://www.youtube.com/watch?v=${item.id}`" target="_blank" rel="noopener">
        <img :src="item.thumbnail" class="thumb">
      </a>
    </div>
    <div class="date">{{item.publishedAt | date}}</div>
    <div class="title"><h2>{{item.title}}</h2></div>
    <div class="desc">{{item.description | desc}}</div>
  </div>
</div>
</template>

<script>
import { DateTime } from 'luxon'

const descRegex = new RegExp(`^(.*?)(.?チャンネル|http).*`)

export default {
  filters: {
    desc(val) {
      return val.replace(descRegex, '$1')
    },
    date(val) {
      return DateTime.fromMillis(val, { zone: 'Asia/Tokyo' }).toFormat('yyyy-MM-dd')
    }
  },
  computed: {
    videos() {
      return this.$store.state.videos.slice().sort((a, b) => b.publishedAt - a.publishedAt)
    }
  }
}
</script>

<style lang="scss" scoped>
.videoListItem {
  display: grid;
  grid-template-columns: auto auto 1fr 1fr;
  grid-gap: 1rem;
}

.thumb {
  width: calc(320px * 0.5);
  height: calc(180px * 0.5);
}
.date {
  font-size: 0.8rem;
}
.title {
  h2 {
    font-size: 1rem;
    font-weight: normal;
  }
}
.desc {
}
</style>
