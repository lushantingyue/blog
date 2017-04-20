import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Validator from 'vue-validator'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Home from './component/Home.vue'
import App from './component/App.vue'
import Aa from './component/Test.vue'
import Test from './component/Test.vue'
import Login from './component/Login.vue'
import Errors from './component/Errors.vue'
import Articles from './component/common/Articles.vue'
import Sendarticles from './component/common/Sendarticles.vue'
import './assets/css/base.css'
import './assets/css/app.css'



Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(Validator);


const router = new VueRouter({
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/home',
            component: Home,
            children: [{
                path: "manage/sendarticles",
                component: Sendarticles,
                name:'发布文章'
            },
            {
                path: "manage/articles",
                component: Articles,
                name:'文章列表'
            }]
        },
        {
            path: '/test',
            component: Test,
            name:'测试1'
        },
        {
            path: '/login',
            component: Login,
            name:'登录'
        },
        {
            path:'*',
            component:Errors
        }
    ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('users');
  }
  let user = JSON.parse(sessionStorage.getItem('users'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})