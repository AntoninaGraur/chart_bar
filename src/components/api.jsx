import axios from 'axios';

axios.defaults.baseURL = 'https://kapusta-backend.goit.global';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const unSetAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ``;
};
                                                                                                                                
export const getTransactionsReports = async date => {
  const { data } = await axios('/transaction/period-data', {
    params: {
      date,
    },
  });

  return data;
};
