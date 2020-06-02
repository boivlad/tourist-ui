import axios from 'axios';

const host = 'http://localhost:8080/api/v1';

const urls = {
  login: `${host}/auth`,
  registration: `${host}/user`,
  registrationManager: `${host}/admin`,
  logout: `${host}/user`,
  hotels: `${host}/hotels`,
};

// let cache = {};

// const callThenWait = (fn, time) => {
//   let timer;
//   return async (data) => {
//     if (!timer) {
//       timer = setTimeout(() => {
//         clearTimeout(timer);
//         timer = undefined;
//       }, time);
//       cache = await fn(data);
//     }
//     return cache;
//   }
// };

const serverRequest = (config) => async({ data = false, params = false } = {
  data: false,
  params: false,
}) => {
  try {
    return await axios({
      ...config,
      data: data || undefined,
      params: params || undefined,
    });
  } catch (e) {
    return e.response;
  }
};
const serviceInfo = {
  getHotels: serverRequest({
    method: 'GET',
    url: urls.hotels,
  }),
};
const auth = {
  login: (name, password) => {
    const sendRequest = serverRequest({
      method: 'POST',
      url: urls.login,
    });
    const data = {
      userName: name,
      password,
    };
    return sendRequest({ data });
  },
  registration: (data) => {
    const sendRequest = serverRequest({
      method: 'POST',
      url: urls.registration,
    });
    return sendRequest({ data });
  },
  registrationManager: (data) => {
    const sendRequest = serverRequest({
      method: 'POST',
      url: urls.registrationManager,
    });
    return sendRequest({ data });
  },
  logout: serverRequest({
    method: 'delete',
    url: urls.logout,
  }),
};


export default {
  ...auth,
  ...serviceInfo,
};
