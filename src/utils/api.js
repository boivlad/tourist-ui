import axios from 'axios';
import { getTokenForHeader } from './functions';

const host = 'http://localhost:8080/';
const apiPath = 'api/v1';
const apiBaseURL = `${host}${apiPath}`;
const urls = {
  login: `${apiBaseURL}/auth`,
  registration: `${apiBaseURL}/user`,
  registrationManager: `${apiBaseURL}/admin`,
  logout: `${apiBaseURL}/user`,
  hotels: `${apiBaseURL}/hotels`,
  tours: `${apiBaseURL}/tours`,
  transfers: `${apiBaseURL}/transfers`,
};
const instance = axios.create({
  baseURL: apiBaseURL,
});

const serviceInfo = {
  getHotels: () => instance.get(`${urls.hotels}`),
  getHotelById: (id) => instance.get(`${urls.hotels}/${id}`),
  getRoomsByHotel: (id) => instance.get(`${urls.hotels}/${id}/rooms`),
  orderRoom: (data) => instance.post(`${urls.hotels}/room/order`, { data }, {
    headers: { Authorization: getTokenForHeader() },
  }),
  getTours: () => instance.get(`${urls.tours}`),
  getTourById: (id) => instance.get(`${urls.tours}/${id}`),
  orderTour: (data) => instance.post(`${urls.tours}/order`, { data }, {
    headers: { Authorization: getTokenForHeader() },
  }),
  getTransfers: () => instance.get(`${urls.transfers}`),
  getTransferById: (id) => instance.get(`${urls.transfers}/${id}`),
};
const auth = {
  login: (name, password) => instance.post(urls.login, {
    userName: name,
    password,
  }),
  registration: (data) => instance.post(urls.registration, {
    data,
  }),
  registrationManager: (data) => instance.post(urls.registrationManager, {
    data,
  }),
  logout: () => instance.delete(urls.logout),
};

export default {
  ...auth,
  ...serviceInfo,
  hostPath: host,
};
