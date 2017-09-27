import { AppPage } from './app.po';
import {browser, by, element} from 'protractor';
import {async} from '@angular/core/testing';
import {count} from 'rxjs/operator/count';

describe('to-do-app App', () => {
  let page: AppPage;
  const AppCompTag = 'app-root';
  const ToDoManagerCompTag = 'app-to-do-manager';
  const ToDosCompTag = 'app-to-dos';
  const FooterCompTag = 'app-footer';

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show To Dos of first list, display the right content/number of ToDos', () => {
    page.navigateTo();

    const firstToDos = 'Coffee';
    // select the first themed list of ToDo
    page.selectFirstList();

    expect(page.getDOMElement(ToDosCompTag, '#toDosList').isPresent()).toBe(true);

    // should have a Coffee ToDo
    expect(page.getTextContentOf(ToDosCompTag, '#toDosList')).toContain(firstToDos);
    // should have 3 lists
    expect(page.getToDosList().count()).toBe(3);
  });

  it('should not show To Dos of first list', () => {
    page.navigateTo();
    // page.selectFirstList();

    expect(page.getDOMElement(ToDosCompTag, '#toDosList').isPresent()).toBe(false);
    // should have 3 lists
    expect(page.getAllLiElement().count()).toBe(3);
  });

});
