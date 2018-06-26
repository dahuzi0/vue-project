<template>
  <div>
    <div class="sidebar-container">
      <v-header></v-header>
    </div>
    <div class="main-container">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import vHeader from './header.vue';

  export default {
    components: {
      vHeader
    }
  }

</script>
<style lang="scss" scoped>
  // 主体区域
  .main-container {
    height: 100%;
    margin-left: 180px;
  }

  // 侧边栏
  .sidebar-container {
    transition: width 0.28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: rgb(48, 65, 86);
  }
</style>
