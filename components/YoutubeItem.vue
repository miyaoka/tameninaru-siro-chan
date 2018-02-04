<template>
  <div>
    <div><img :src="thumbnail"></div>
    <div>{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
    thumbnail: { type: String }
  }
}
</script>


<style>

</style>
