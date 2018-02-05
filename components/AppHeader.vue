<template>
<header class="AppHeader">
  <div>ためになるシロちゃんのミックス動画プレイヤー</div>
  <nav>
    <nuxt-link to="/" exact>プレイヤー</nuxt-link> /
    <nuxt-link to="/calendar">カレンダー</nuxt-link> /
    <nuxt-link to="/videos">いちらん</nuxt-link>
  </nav>
</header>
</template>

<style lang="scss" scoped>
.nuxt-link-active {
  border-bottom: 2px solid #80d4ef;
}
.AppHeader {
  margin-bottom: 2rem;
  text-align: center;
}
</style>
