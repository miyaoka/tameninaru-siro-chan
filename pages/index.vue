<template>
  <section class="container">
    <h2>Player</h2>
    <VideoPlayer/>
    <hr>
    <h2>Calendar</h2>
    <VideoCalendar :date.sync="date"/>
    <hr>
    <h2>List</h2>
    <VideoList/>
  </section>
</template>

<script>
import videos from '~/static/youtubeSearch.json'
import VideoList from '~/components/VideoList.vue'
import VideoPlayer from '~/components/VideoPlayer.vue'
import VideoCalendar from '~/components/VideoCalendar.vue'

export default {
  components: {
    VideoList,
    VideoPlayer,
    VideoCalendar
  },
  fetch({ store }) {
    store.commit('videos', videos)
  },
  data() {
    return {
      date: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
