import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    currWorkoutData: [],
    workoutSessionStartTime: null,
  },

  mutations: {
    updateExerciseData: (state, data) => {
      state.items.push(data)
    },
    updateCurrWorkoutData: (state, data) => {
      state.currWorkoutData.push(data)
    },
    addNewStartTime: (state, data) => {
      state.workoutSessionStartTime = data
    }

  },

  actions: {
    // Called from WorkoutTempalteChild.vue
    loadItems: (context, data) => {
      context.commit('updateExerciseData', data);
    },
    loadCurrItems: (context, data) => {
      context.commit('updateCurrWorkoutData', data);
    }
  },
  
})
