import axios from 'axios';

const host = "";

const urls = {
  login: `${host}/auth`,
  logout: `${host}/logout`,
};

let cache = {};

const callThenWait = (fn, time) => {
  let timer;
  return async (data) => {
    if (!timer) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = undefined;
      }, time);
      cache = await fn(data);
    }
    return cache;
  }
};

const serverRequest = config => async ({ data = false, params = false } = { data: false, params: false }) => {
  try {
    const r = await axios({
      ...config,
      data: data || undefined,
      params: params || undefined,
    });
    return r.data;
  } catch (e) {
    return e.response.data;
  }
};

const auth = {
  login: serverRequest({
    method: 'POST',
    url: urls.login,
  }),
  logout: serverRequest({
    method: 'POST',
    url: urls.logout
  }),
};


export default {
  ...auth,
}
