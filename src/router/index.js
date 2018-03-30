import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'

Vue.use(Router)

const Login = r => require.ensure([], () => r(require('@/components/login/login')), 'login');
const Manage = r => require.ensure([], () => r(require('@/components/manage/manage')), 'manage');
const Home = r => require.ensure([], () => r(require('@/components/home/home')), 'home');
const addMerchant = r => require.ensure([], () => r(require('@/components/addMerchant/addMerchant')), 'addMerchant');
const channel = r => require.ensure([], () => r(require('@/components/jinjian/channel')), 'channel');
const merchant = r => require.ensure([], () => r(require('@/components/jinjian/merchant')), 'merchant');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/manage',
      name: '',
      component: Manage,
      beforeEnter: (to,from,next)=> {   //导航守卫
          console.log(to)
          console.log(from)
          if(store.state.isLogin == 1){
            console.log('用户已经登录');
            next();
          }else{
            console.log('用户未登录');
            next({path: '/login',query:{ Rurl: to.fullPath}});  //未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来
          }
      },
      children: [{
        path: '',
        component: Home,
        meta: []
      },{
        path: '/channel',
        component: channel,
        meta: ['进件首页','渠道进件']
      },{
        path: '/merchant',
        component: merchant,
        meta: ['进件首页','商户进件']
      },{
        path: '/addMerchant',
        component: addMerchant,
        meta: ['进件首页','商户进件', '新增商户']
      }]
    }
  ]
})
