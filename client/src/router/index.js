import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import Profile from '../pages/Profile'
import Test from '../components/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
