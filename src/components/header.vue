<template>
  <div>
    <div>
      <div>
        <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" unique-opened router
                 active-text-color="#fff" background-color="#2F333D">
          <template v-for="item in items">
            <el-menu-item :index="item.index"
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
  import {setStore, removeStore} from '../utils/save_util'

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
            index: 'classMS',
            title: '班级管理',
            tag: 1
          }, {
            index: 'onlineClass',
            title: '监课系统',
            tag: 2
          }, {
            index: 'coursewareMS',
            title: '课件管理',
            tag: 3
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
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      "$route": "getTabTag"
    }
  }

</script>
<style scoped>

</style>
