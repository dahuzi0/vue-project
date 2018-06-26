/**
* Author: earl
* Create Time: 2018-06-26 14:28
* Description: 视频
*/

<template>
  <div class="index">
    <my-video :sources="video.sources" :options="video.options" :errorMsg="video.errorMsg"></my-video>
  </div>
</template>

<script>
  import myVideo from 'vue-media-player'

  export default {
    data() {
      return {
        video: {
          sources: [{
            src: 'http://zxxb-oss.haibian.com/2018/4/28/MP4/1524924727703.mp4',
            type: 'video/mp4'
          }],
          options: {
            autoplay: false,
            volume: 0.6,
            poster: 'https://github.com/EARL8888/SrcPath/blob/master/video/video_poster.jpg?raw=true'
          },
          errorMsg: '视频加载失败!'
        }
      }
    },
    components: {
      myVideo
    }
  }
</script>

<style scoped>

  .index {
    width: 1000px;
  }

</style>
