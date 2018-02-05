<template>
  <youtube
    v-if="videoId"
    :videoId="videoId"
    :player-width="width"
    :player-height="height"
    :playerVars="playerVars"
    @ready="ready"
    @ended="$emit('ended')"
  />
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    vid: { type: String },
    height: { type: Number },
    width: { type: Number },
    volume: { type: Number, default: 100 }
  },
  data() {
    return {
      videoId: this.vid,
      playerVars: {
        start: 7,
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        showinfo: 1,
        rel: 0
      }
    }
  },
  watch: {
    vid() {
      this.videoId = null

      // Force reload component to enable playerVars
      Vue.nextTick(() => {
        this.videoId = this.vid
      })
    }
  },
  methods: {
    ready(player) {
      player.setVolume(this.volume)
      player.playVideo()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
