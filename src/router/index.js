import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import DashboardView from '../views/DashboardView.vue'
import WorkoutSplit from '../views/WorkoutSplit.vue'
import UserLogin from '../views/LoginViews/UserLogin.vue'
import UserRegistration from '../views/LoginViews/UserRegistration.vue'
import CurrentWorkout from '../views/CurrentWorkout.vue'
import WorkoutTemplate from '../views/WorkoutTemplate.vue'
import WorkoutHistory from '../views/WorkoutHistory.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/DashboardView',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/',
    name: 'WorkoutSplit',
    component: WorkoutSplit
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/UserRegistration',
    name: 'UserRegistration',
    component: UserRegistration
  },
  {
    path: '/CurrentWorkout/:workout',
    name: 'CurrentWorkout',
    component: CurrentWorkout
  },
  {
    path: '/WorkoutTemplate/:workout',
    name: 'WorkoutTemplate',
    component: WorkoutTemplate
  },
  {
    path: '/WorkoutHistory',
    name: 'WorkoutHistory',
    component: WorkoutHistory
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
