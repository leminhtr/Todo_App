import { AppPage } from './app.po';
import {browser, by, element} from 'protractor';
import {async} from '@angular/core/testing';
import {count} from 'rxjs/operator/count';

describe('to-do-app App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // ***** App Component E2E ***** //
  /**
   * Test to check h1 content
   */
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('TODO App');
  });
});
