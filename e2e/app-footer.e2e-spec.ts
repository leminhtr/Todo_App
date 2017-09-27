import { AppPage } from './app.po';
import {browser, by, element} from 'protractor';
import {async} from '@angular/core/testing';
import {count} from 'rxjs/operator/count';

describe('to-do-app App', () => {
  let page: AppPage;
  const footerCompTag = 'app-footer';

  beforeEach(() => {
    page = new AppPage();
  });

  /**
   * Test to check footer show List Name
   */
  it('should show List Name in footer', () => {
    page.navigateTo();
    const firstListName = page.getNthListToDoTextContent(0);
    page.selectFirstList();

    const footerListName = page.getTextContentOf(footerCompTag, '#listName')
      .then(function (res) {
        // All caps because uppercase angular pipe is used on list name in To Do Manager view
        return res.toUpperCase();
      });

    expect(firstListName).toBe(footerListName);
  });


});
