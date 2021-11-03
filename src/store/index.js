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
    updateCurrWorkoutData: (state, items) => {
      state.currWorkoutData.push(items)
    }
  },

  actions: {
    loadItems: (context, data) => {
      context.commit('updateExerciseData', data);
    }
  },loadCurItems: (context, items) => {
      context.commit('updateCurrWorkoutData', items);
    }
  
})
