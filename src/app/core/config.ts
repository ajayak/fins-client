const defaultBaseUrl = 'http://localhost:3000';

export const config = {
  urls: {
    baseUrl: defaultBaseUrl
  },
  appKeys: {
    jwtKey: 'fins_app'
  },
  setBaseUrl: (url: string) => {
    config.urls.baseUrl = url;
  }
};
