export default {
  state() {
    return {
      notification: {
        isActive: false,
        type: 'success',
        message: 'Success'
      },
      theme: 'light',
      isRequestModal: false
    };
  },
  mutations: {
    SET_NOTIFICATION(state, payload) {
      state.notification = payload;
    },
    SET_THEME(state, payload) {
      state.theme = payload;
    },
    SET_IS_REQUEST_MODAL(state, payload) {
      state.isRequestModal = payload;
    }
  },
  actions: {
    fetch({
      commit
    }, payload) {
      commit('SET_NOTIFICATION', payload);
      const closeNotification = {
        isActive: false
      };
      setTimeout(() => {
        commit('SET_NOTIFICATION', closeNotification);
      }, 3000);
    },

    fetchTheme({
      commit
    }, payload) {
      commit('SET_THEME', payload);
    },

    fetchRequestModal({
      commit
    }, payload) {
      commit('SET_IS_REQUEST_MODAL', payload);
    }
  },
  getters: {
    getNotification(state) {
      return state.notification;
    },
    getTheme(state) {
      return state.theme;
    },
    getIsRequestModal(state) {
      return state.isRequestModal;
    }
  }
};
