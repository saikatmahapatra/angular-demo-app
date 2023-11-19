export const environment = {
  name: 'prod',
  version: require('../../package.json').version + '-prod',
  production: true,
  apiBaseUrl: "http://portalapi.ueipl.co.in/api/",
  mockAPIUrl: "http://localhost:7878/",
  useMockServer: false,
  productName: "MyApp",
  logo: "assets/img/logo.svg",
  copyrightInfo: "Copyright &copy; 2023 United Exploration India Pvt Ltd (UEIPL)"
};
