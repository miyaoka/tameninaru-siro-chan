<template>
  <section class="container">
    <header>
      <h1>ミックスプレイヤー</h1>
    </header>
    <main>
      <MixPlayer/>
    </main>
  </section>
</template>

<script>
import videos from '~/static/youtubeSearch.json'
import MixPlayer from '~/components/MixPlayer.vue'

export default {
  components: {
    MixPlayer
  },
  fetch({ store }) {
    store.commit('videos', videos)
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
