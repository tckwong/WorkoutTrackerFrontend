import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import WorkoutView from '../views/WorkoutView.vue'
import WorkoutSplitView from '../views/WorkoutSplitView.vue'
import UserLoginView from '../views/UserLoginView.vue'
import UserRegistrationView from '../views/UserRegistrationView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/DashboardView',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/WorkoutView',
    name: 'WorkoutView',
    component: WorkoutView
  },
  {
    path: '/WorkoutSplitView',
    name: 'WorkoutSplitView',
    component: WorkoutSplitView
  },
  {
    path: '/UserLoginView',
    name: 'UserLoginView',
    component: UserLoginView
  },
  {
    path: '/UserRegistrationView',
    name: 'UserRegistrationView',
    component: UserRegistrationView
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
