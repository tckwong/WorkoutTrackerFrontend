import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import WorkoutSplit from '../views/WorkoutSplit.vue'
import UserLoginView from '../views/UserLoginView.vue'
import UserRegistrationView from '../views/UserRegistrationView.vue'
import ExerciseView from '../views/ExerciseView.vue'
import CurrentWorkout from '../views/CurrentWorkout.vue'

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
    path: '/WorkoutSplit',
    name: 'WorkoutSplit',
    component: WorkoutSplit
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
    path: '/ExerciseView/:workout',
    name: 'ExerciseView',
    component: ExerciseView
  },
  {
    path: '/CurrentWorkout/:workout',
    name: 'CurrentWorkout',
    component: CurrentWorkout
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
