import { WebApp2Page } from './app.po';

describe('web-app2 App', function() {
  let page: WebApp2Page;

  beforeEach(() => {
    page = new WebApp2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
