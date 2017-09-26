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

  // ***** App Component E2E ***** //
  /**
   * Test to check h1 content
   */
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('TODO App');
  });

  // ***** ToDoManager Component E2E ***** //
  it('should show ToDo Manager list', () => {
    page.navigateTo();
    const firstListName = 'SHOPPING LIST';

    // first list name should match
    expect(page.getDOMTextContent(ToDoManagerCompTag, '#listToDoElement')).toContain(firstListName);
    // should have 3 lists
    expect(page.getAllLiElement().count()).toBe(3);
  });

  /**
   * Test to check if ToDoManager list is all being displayed
   */
  it('should add a new list and increment list length', async() => {
    page.navigateTo();
    page.addNewList('List');
    // await

    expect(page.getAllLiElement().count()).toBe(4);
  });

  it('should delete a list and decrement list length', async() => {
    page.navigateTo();
    page.deleteList();

    expect(page.getAllLiElement().count()).toBe(2);
  });

  it('should edit a list name', async() => {
    page.navigateTo();
    // All caps because uppercase angular pipe is used on list name in To Do Manager view
    const newName = 'LISTEDITED';
    page.editListName(newName);

    const EditedListName = page.getDOMTextContent(ToDoManagerCompTag, '#listToDoElement');
    expect(EditedListName).toContain(newName);
  });
  // it('should get the name of the selected list when initialized', async(() => {
  //   page.navigateTo();
  //   // const ToDoManagerList = page.getAllLiElement();
  //   await
  //   expect(page.getAllLiElement().count()).toBe(3);
  // }));

  // it('should display all ToDoManager list', async ( () => {
  //   page.navigateTo();
  //   const ToDoManagerList = page.getAllLiElement();
  //   expect(ToDoManagerList.length).toBe(3);
  //   // for (let i = 0; i < ToDoManagerList.length ; i++) {
  //   //   expect(ToDoManagerList[i]).toEqual('TODO App');
  //   // }
  // }));

});
