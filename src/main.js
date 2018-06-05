// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/base.css'
import {removeStore} from './utils/save_util'

Vue.config.productionTip = false

Vue.use(ElementUI)

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
Vue.prototype.setCookie = (c_name, value, expireHours) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expireHours);
  document.cookie = c_name + "=" + escape(value) + ((expireHours == null) ? "" : ";expires=" + exdate.toGMTString()) + ";max-age=" + expireHours;
};

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  watch: {
    "$route": 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      //检查是否存在session
      if (!this.getCookie('session')) {
        this.$router.push('/login');
      } else {
        let routeName = this.$route.path;
        if (!routeName || routeName === "/login") this.$router.push('/index');
      }
    }
  }
});
