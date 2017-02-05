const defaultBaseUrl = 'http://localhost:3000';

export const config = {
  urls: {
    baseUrl: defaultBaseUrl
  },
  setBaseUrl: (url: string) => {
    config.urls.baseUrl = url;
  }
};
