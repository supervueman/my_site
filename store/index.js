import Vuex from 'vuex';
import serverInit from './serverInit';
import common from './common';
import notification from './notification';
import dictionary from './dictionary';

const store = () => {
  return new Vuex.Store({
    modules: {
      serverInit,
      common,
      notification,
      dictionary
    }
  });
};

export default store;
