import axios from 'axios';

const host = 'http://localhost:8080/';
const apiPath = 'api/v1';
const urls = {
  login: `${host}${apiPath}/auth`,
  registration: `${host}${apiPath}/user`,
  registrationManager: `${host}${apiPath}/admin`,
  logout: `${host}${apiPath}/user`,
  hotels: `${host}${apiPath}/hotels`,
  tours: `${host}${apiPath}/tours`,
  transfers: `${host}${apiPath}/transfers`,
};

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
  getTours: serverRequest({
    method: 'GET',
    url: urls.tours,
  }),
  getTransfers: serverRequest({
    method: 'GET',
    url: urls.transfers,
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
  hostPath: host,
};
