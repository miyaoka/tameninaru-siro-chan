<template>
  <section class="container">
    <haeder>
      <h1>カレンダー</h1>
    </haeder>
    <main>
      <VideoCalendar :date.sync="date"/>
    </main>
  </section>
</template>

<script>
import VideoCalendar from '~/components/VideoCalendar.vue'

export default {
  components: {
    VideoCalendar
  },
  data() {
    return {
      date: new Date()
    }
  },
  head() {
    return {
      title: 'カレンダー'
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
