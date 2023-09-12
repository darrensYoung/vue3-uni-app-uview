export default {
  namespaced: true,
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state:any) {
      console.log(state)
      state.count++
    }
  }
  }
