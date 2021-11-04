import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    currWorkoutData: []
  },

  mutations: {
    updateExerciseData: (state, data) => {
      state.items.push(data)
    },
    updateCurrWorkoutData: (state, data) => {
      state.currWorkoutData.push(data)
    }
  },

  actions: {
    loadItems: (context, data) => {
      context.commit('updateExerciseData', data);
    },
    loadCurrItems: (context, data) => {
      context.commit('updateCurrWorkoutData', data);
    }
  },
  
})
