import fakeDialogs from './fakeDialogs';

export default {
  state: {
    dialogs: [],
    userName: 'user'
  },
  getters: {
    dialogs ({ dialogs }) {
      return dialogs;
    },
    dialogById ({ dialogs }) {
      return (id) => {
        return dialogs.find((item) => item.id === id);
      }
    },
    username ({ userName }) {
      return userName;
    }
  },
  mutations: {
    loadDialogs (state, items) {
      state.dialogs = items;
    },
    submitMessage (state, { id, message }) {
      const parts = state.dialogs.find(item => item.id === id).parts;
      parts.push({
        author: state.userName,
        created: new Date(),
        id: parts.length + 1,
        text: message
      });
    }
  },
  actions: {
    loadDialogs ({ commit }) {
      setTimeout(() => {
        commit('loadDialogs', fakeDialogs)
      }, 1000);
    },
    submitMessage ({ commit }, options) {
      commit('submitMessage', options);
    }
  }
}
