<template>
  <youtube
    v-if="videoId"
    :videoId="videoId"
    :player-width="width"
    :player-height="height"
    :playerVars="playerVars"
    :mute="muted"
    @ready="onReady"
    @ended="$emit('ended')"
  />
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    muted: { type: Boolean, default: false },
    paused: { type: Boolean, default: true },
    quality: { type: String, default: 'default' },
    vid: { type: String },
    height: { type: Number },
    width: { type: Number },
    volume: { type: Number, default: 100 }
  },
  data() {
    return {
      afterFirst: false,
      player: null,
      videoId: this.vid,
      playerVars: {
        start: 7,
        autoplay: 0,
        modestbranding: 1,
        controls: 1,
        showinfo: 1,
        rel: 0
      }
    }
  },
  watch: {
    paused(paused) {
      if (!this.player) return
      if (paused) {
        this.player.pauseVideo()
      } else {
        this.player.playVideo()
      }
    },
    vid() {
      this.videoId = null
      if (this.player) {
        this.player.removeEventListener('onVolumeChange', this.onVolumeChange)
        this.player.removeEventListener('onStateChange', this.onStateChange)
        this.player = null
        this.afterFirst = true
      }

      // Force reload component to enable playerVars
      Vue.nextTick(() => {
        this.videoId = this.vid
      })
    }
  },
  methods: {
    onStateChange({ data: state }) {
      // state
      // 0: ENDED
      // 1: PLAYING
      // 2: PAUSED
      this.$emit('update:paused', state === 2)
    },
    onVolumeChange({ data: { volume, muted } }) {
      this.$emit('update:volume', volume)
      this.$emit('update:muted', muted)
    },
    onReady(player) {
      player.addEventListener('onVolumeChange', this.onVolumeChange)
      player.addEventListener('onStateChange', this.onStateChange)
      player.setVolume(this.volume)
      if (this.afterFirst) player.playVideo()

      // setPlaybackQuality is not working
      // https://stackoverflow.com/questions/27022565/setplaybackquality-not-working-youtube-js-api
      player.setPlaybackQuality(this.quality)

      this.player = player
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
