import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/Products.vue'
import Categories from '../views/Categories.vue'
import Team from '../views/Team.vue'
import Login from '../views/Login.vue'
import Register from '../views/register.vue'
import Logout from '../views/Logout.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
