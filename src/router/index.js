import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import WeekSplitView from '../views/WeekSplitView.vue'
import UserLoginView from '../views/UserLoginView.vue'
import UserRegistrationView from '../views/UserRegistrationView.vue'
import WorkoutExerciseView from '../views/WorkoutExerciseView.vue'

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
    path: '/WeekSplitView',
    name: 'WeekSplitView',
    component: WeekSplitView
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
  {
    path: '/WorkoutExerciseView',
    name: 'WorkoutExerciseView',
    component: WorkoutExerciseView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
