const defaultBaseUrl = 'http://localhost:54976';

export const config = {
  urls: {
    base: defaultBaseUrl,
    token: 'connect/token'
  },
  appKeys: {
    jwtAccessKey: 'fins_app_access',
    jwtIdKey: 'fins_app_id'
  },
  setBaseUrl: (url: string) => {
    config.urls.base = url;
  }
};
