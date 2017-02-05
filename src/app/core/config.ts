const defaultBaseUrl = 'http://localhost:3000';

export const config = {
  urls: {
    base: defaultBaseUrl,
    token: 'connect/token'
  },
  appKeys: {
    jwtKey: 'fins_app'
  },
  setBaseUrl: (url: string) => {
    config.urls.base = url;
  }
};
