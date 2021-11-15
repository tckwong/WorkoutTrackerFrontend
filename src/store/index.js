import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    itemsSaved: [],
    currWorkoutData: [],
    workoutSessionStartTime: null,
    currentState: false
  },

  mutations: {
    updateExerciseData: (state, data) => {
      state.items.push(data)
    },
    updateExerciseDataSaved: (state, data) => {
      state.itemsSaved.push(data)
    },
    updateCurrWorkoutData: (state, data) => {
      state.currWorkoutData.push(data)
    },
    addNewStartTime: (state, data) => {
      state.workoutSessionStartTime = data
    },
    updateState:(state, data) => {
      state.currentState = data
    }

  },

  actions: {
    // Called from WorkoutTempalteChild.vue
    loadItems: (context, data) => {
      context.commit('updateExerciseData', data);
    },
    loadItemsSaved: (context, data) => {
      context.commit('updateExerciseDataSaved', data);
    },
    loadCurrItems: (context, data) => {
      context.commit('updateCurrWorkoutData', data);
    }
  },
  
})
