import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import Profile from '../pages/Profile'
import Test from '../components/Test'
import Upload from '../components/Upload'
import PostPage from '../pages/PostPage'
import AdminHomePage from '../pages/AdminHomePage'

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
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: PostPage
    },
    {
      path: '/admin',
      name: 'AdminHome',
      component: AdminHomePage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
