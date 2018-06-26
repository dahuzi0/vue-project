<template>
  <div>
    <div>
      <div>
        <el-menu
          router
          :default-active="$route.path"
          mode="vertical"
          :show-timeout="200"
          background-color="#304156"
          text-color="#bfcbd9"
          active-text-color="#409EFF">
          <template v-for="item in items">
            <el-menu-item
              :index="item.index"
              :class="item.tag == tabTag?'is_active':''">
              {{ item.title }}
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="clearfix">
        <div class="out_login fr">
          <span @click="logout()">退出登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {removeStore} from '../utils/save_util'

  export default {
    data() {
      return {
        schoolAreas: [],
        items: [
          {
            index: 'index',
            title: '概览页',
            tag: 0
          },
          {
            index: 'video',
            title: '视频',
            tag: 1
          },
          {
            index: 'pic',
            title: '图片',
            tag: 2
          },
          {
            index: 'text',
            title: '文字',
            tag: 3
          },
          {
            index: 'map',
            title: '地图',
            tag: 4
          }
        ],
        tabTag: 0,
      }
    },
    created: function () {
    },
    methods: {

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      logout() {
        this.$confirm('确认退出？')
          .then(_ => {
            this.delCookie("session_earl");//清除认证cookie
            this.$router.push('/login');
          })
          .catch(_ => {
            //退出取消
          });
      },

      getTabTag() {
        let routePath = this.$route.path;
        if (routePath == '/index') {
          this.tabTag = 0;
        } else if (routePath == '/video') {
          this.tabTag = 1;
        } else if (routePath == '/pic') {
          this.tabTag = 2;
        } else if (routePath == '/text') {
          this.tabTag = 3;
        } else if (routePath == '/map') {
          this.tabTag = 4;
        }
      },
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "getTabTag"
    }
  }

</script>
<style lang="scss" scoped>
</style>
