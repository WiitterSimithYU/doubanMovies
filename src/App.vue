<template>
  <div class="container">
    <douban-loading v-show="loading_show"></douban-loading>
    <douban-header></douban-header>
  
    <transition name="slide">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
  
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import doubanHeader from './components/header/header'
import doubanLoading from './components/loading/loading'
export default {
  computed: {
    ...mapState([
      'loading_show'
    ])
  },
  components: {
    doubanHeader,
    doubanLoading
  },
  created () {
    alert(mine.hostname)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import './common/sass/_base.scss';
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>