<template>
<div class="calendar">
  <div class="calendar-control">
    <button @click="changeMonth(-1)">prev</button>
    <div>{{year}}/{{month + 1}}</div>
    <button @click="changeMonth(1)">next</button>
  </div>
  <div class="calendar-body">
    <div
      v-for="date in dateListFlat"
      :key="date.valueOf()"
      class="date stack"
    >
      <a
        :href="`https://www.youtube.com/watch?v=${videoMap.get(date.valueOf())[0].id}`"
        target="_blank"
        rel="noopener"
        v-if="videoMap.get(date.valueOf())"
      >
        <img :src="videoMap.get(date.valueOf())[0].thumbnail">
      </a>
      <div class="num">{{date.getDate()}}</div>
    </div>
  </div>
</div>
</template>

<script>
const getDateList = (date, month, weekList) => {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()
  const w = weekList ? weekList.length * 7 : 0
  const week = [...Array(7).keys()].map((i) => new Date(y, m, d + i + w))
  if (weekList && week[0].getMonth() !== month) return weekList
  return getDateList(date, month, [...(weekList || []), week])
}
export default {
  props: {
    date: { type: Date, default: () => new Date() }
  },
  filters: {
    date(date) {
      return date.toLocaleString()
    }
  },
  computed: {
    year() {
      return this.date.getFullYear()
    },
    month() {
      return this.date.getMonth()
    },
    firstdayOfMonth() {
      return new Date(this.year, this.month, 1)
    },
    firstdayOfCalendar() {
      return new Date(
        this.firstdayOfMonth.getFullYear(),
        this.firstdayOfMonth.getMonth(),
        1 - this.firstdayOfMonth.getDay()
      )
    },
    dateList() {
      return getDateList(this.firstdayOfCalendar, this.month)
    },
    dateListFlat() {
      return this.dateList.reduce((acc, curr) => [...acc, ...curr])
    },
    lastdayOfMonth() {
      return new Date(this.year, this.month + 1, 0)
    },
    lastdayOfCalendar() {
      return new Date(
        this.lastdayOfMonth.getFullYear(),
        this.lastdayOfMonth.getMonth(),
        this.lastdayOfMonth.getDate() - this.lastdayOfMonth.getDay() + 6
      )
    },
    videoMap() {
      const map = new Map()
      this.$store.state.videos.forEach((video) => {
        const d = new Date(video.publishedAt)
        const key = new Date(d.getFullYear(), d.getMonth(), d.getDate()).valueOf()
        const val = map.get(key)
        map.set(key, val ? [...val, video] : [video])
      })
      return map
    }
  },
  methods: {
    dateStyle(date) {
      const v = this.videoMap.get(date.valueOf())
      return {
        'background-image': v ? `url(${v[0].thumbnail})` : 'none'
      }
    },
    changeMonth(m) {
      this.$emit('update:date', new Date(this.year, this.month + m))
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  display: grid;
  margin: 2rem;
  grid-gap: 4rem;

  &-control {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-gap: 0.5rem;
    text-align: center;
    align-items: center;
  }

  &-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 0.5rem;
  }
}
.date {
  img {
    width: 100%;
    border-radius: 1rem;

    transition: all 0.2s ease-out;
    &:hover {
      border-radius: 0;
      transform: scale(2);
      box-shadow: 0px 6px 32px 2px rgba(0, 0, 0, 0.25);
    }
  }

  .num {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.3);
  }
}

.stack {
  display: grid;
  grid-template-areas: 'stack';
  & > * {
    grid-area: stack;
  }
}
</style>
