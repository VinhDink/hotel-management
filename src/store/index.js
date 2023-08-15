import { createStore } from 'vuex';

const storeConfig = {
  state: {
    role: localStorage.getItem('role'),
  },

  mutations: {
    setRole(state) {
      state.role = localStorage.getItem('role');
    },
    removeRole(state) {
      state.role = null;
    },
  },
};

const store = createStore(storeConfig)

export default store;
