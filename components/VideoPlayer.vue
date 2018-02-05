<template>
<div ref="main">
  <div class="stack">
    <VideoPlayerCore
      :vid="mainId"
      :width="width"
      :height="height"
      :volume="0"
      @ended="mainId = getRandomId()"
    />
    <div class="se">
      <div class="player">
        <VideoPlayerCore
          :vid="seId"
          :width="subWidth"
          :height="subWidth"
          :volume="50"
          @ended="seId = getRandomId()"
        />
      </div>
      <div class="role">SE担当</div>
    </div>
    <div class="bgm">
      <div class="player">
        <VideoPlayerCore
          :vid="bgmId"
          :width="subWidth"
          :height="subWidth"
          :volume="50"
          @ended="bgmId = getRandomId()"
        />
      </div>
      <div class="role">BGM担当</div>
    </div>
  </div>
  <button @click="mainId = getRandomId()">random</button>
</div>
</template>

<script>
import { mapState } from 'vuex'
import VideoPlayerCore from '~/components/VideoPlayerCore.vue'

const aspectRatio = 16 / 9

export default {
  components: {
    VideoPlayerCore
  },
  data() {
    return {
      mainId: '',
      seId: '',
      bgmId: '',
      width: 0,
      height: 0
    }
  },
  mounted() {
    this.mainId = this.getRandomId()
    this.seId = this.getRandomId()
    this.bgmId = this.getRandomId()
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  computed: {
    ...mapState(['videos']),
    subWidth() {
      return this.width * 0.2
    }
  },
  methods: {
    ended() {
      console.log('ed')
      this.mainId = this.getRandomId()
    },
    getRandomId() {
      return this.videos[Math.floor(this.videos.length * Math.random())].id
    },
    onResize() {
      this.width = this.$refs.main.clientWidth
      this.height = this.width / aspectRatio
    }
  }
}
</script>

<style lang="scss" scoped>
.stack {
  display: grid;
  grid-template-areas: 'stack';
  & > * {
    grid-area: stack;
  }
}
.se {
  justify-self: start;
}
.bgm {
  justify-self: end;
}
.bgm,
.se {
  margin: 10px;
  position: relative;
  align-self: start;
  .player {
    border-radius: 50%;
    overflow: hidden;
  }
}
.role {
  position: absolute;
  bottom: 0;
  transform: translateY(50%);
  background: #80d4ef;
  color: #000d1d;
  font-size: 1.4rem;
  width: 100%;
  text-align: center;
  border: 1px solid #defeff;
  border-radius: 2px;
}
</style>
