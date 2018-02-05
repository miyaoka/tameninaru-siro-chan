<template>
  <section class="container">
    <header>
      <h1>いちらん</h1>
    </header>
    <main>
      <VideoList/>
    </main>
  </section>
</template>

<script>
import VideoList from '~/components/VideoList.vue'

export default {
  components: {
    VideoList
  },
  head() {
    return {
      title: 'いちらん'
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
