export const environment = {
  name: 'prod',
  version: require('../../package.json').version + '-prod',
  production: true,
  productName: "MyApp",
  apiBaseUrl: "http://portalapi.ueipl.co.in/api/",
  mockAPIUrl: "http://localhost:7878/",
  useMockServer: false
};
