<template>
<div ref="main">
  <div class="stack" v-if="true">
    <VideoPlayer
      :vid="mainVideo.id"
      :width="width"
      :height="height"
      :volume.sync="mainVolume"
      :paused.sync="mainPaused"
      :muted.sync="mainMuted"
      quality="small"
      @ended="mainVideo = getRandomVideo()"
    />
    <div class="se">
      <div class="player">
        <VideoPlayer
          :vid="seVideo.id"
          :width="subWidth"
          :height="subWidth"
          :volume.sync="seVolume"
          :paused.sync="sePaused"
          :muted.sync="seMuted"
          :quality="subQuality"
          @ended="seVideo = getRandomVideo()"
        />
      </div>
      <div class="role">SE担当</div>
    </div>
    <div class="bgm">
      <div class="player">
        <VideoPlayer
          :vid="bgmVideo.id"
          :width="subWidth"
          :height="subWidth"
          :volume.sync="bgmVolume"
          :paused.sync="bgmPaused"
          :muted.sync="bgmMuted"
          :quality="subQuality"
          @ended="bgmVideo = getRandomVideo()"
        />
      </div>
      <div class="role">BGM担当</div>
    </div>
  </div>

  <div class="controls">
    <div>
      <div>SE</div>
      <img :src="seVideo.thumbnail" @click="seVideo = getRandomVideo()">
      <div class="buttons">
        <button @click="seVideo = getRandomVideo()"><icon scale="1.2" name="undo"/></button>
        <button @click="sePaused = !sePaused"><icon scale="1.2" :name="sePaused ? 'pause' : 'play'"/></button>
        <button @click="seMuted = !seMuted"><icon scale="1.2" :name="seMuted ? 'volume-off' : 'volume-up'"/></button>
      </div>
    </div>
    <div>
      <div>メイン</div>
      <img :src="mainVideo.thumbnail" @click="mainVideo = getRandomVideo()">
      <div class="buttons">
        <button @click="mainVideo = getRandomVideo()"><icon scale="1.2" name="undo"/></button>
        <button @click="mainPaused = !mainPaused"><icon scale="1.2" :name="mainPaused ? 'pause' : 'play'"/></button>
        <button @click="mainMuted = !mainMuted"><icon scale="1.2" :name="mainMuted ? 'volume-off' : 'volume-up'"/></button>
      </div>
    </div>
    <div>
      <div>BGM</div>
      <img :src="bgmVideo.thumbnail" @click="bgmVideo = getRandomVideo()">
      <div class="buttons">
        <button @click="bgmVideo = getRandomVideo()"><icon scale="1.2" name="undo"/></button>
        <button @click="bgmPaused = !bgmPaused"><icon scale="1.2" :name="bgmPaused ? 'pause' : 'play'"/></button>
        <button @click="bgmMuted = !bgmMuted"><icon scale="1.2" :name="bgmMuted ? 'volume-off' : 'volume-up'"/></button>
      </div>
    </div>
    <div class="text">画像クリックでチェンジ</div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import VideoPlayer from '~/components/VideoPlayer.vue'

const aspectRatio = 16 / 9

export default {
  components: {
    VideoPlayer
  },
  data() {
    return {
      subQuality: 'small',
      mainVideo: {},
      seVideo: {},
      bgmVideo: {},
      sePaused: false,
      seMuted: false,
      seVolume: 50,
      mainPaused: false,
      mainMuted: true,
      mainVolume: 50,
      bgmPaused: false,
      bgmMuted: false,
      bgmVolume: 50,
      width: 0,
      height: 0
    }
  },
  mounted() {
    this.mainVideo = this.getRandomVideo()
    this.seVideo = this.getRandomVideo()
    this.bgmVideo = this.getRandomVideo()
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
      this.mainVideo = this.getRandomVideo()
    },
    getRandomVideo() {
      return this.videos[Math.floor(this.videos.length * Math.random())]
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
.controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: 'se main bgm' 'text text text';

  & > * {
    padding: 1rem;
    text-align: center;
  }
  img {
    width: 100%;
    cursor: pointer;
    border-radius: 1rem;
    border: 1px solid #80d4ef;
  }
  .buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  button {
    border: none;
    &:hover {
      background: #80d4ef;
      color: #fff;
      opacity: 1;
    }
  }
  .text {
    grid-area: text;
  }
}
</style>
