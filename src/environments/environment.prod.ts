export const environment = {
  name: 'prod',
  version: require('../../package.json').version + '-prod',
  production: true,
  apiBaseUrl: "http://portalapi.ueipl.co.in/api/",
  mockAPIUrl: "http://localhost:7878/",
  useMockServer: false
};
