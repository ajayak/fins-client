import { FinsClientPage } from './app.po';

describe('fins-client App', () => {
  let page: FinsClientPage;

  beforeEach(() => {
    page = new FinsClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
