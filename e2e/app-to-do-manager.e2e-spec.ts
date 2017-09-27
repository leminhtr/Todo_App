import { AppPage } from './app.po';
import {browser, by, element} from 'protractor';
import {async} from '@angular/core/testing';
import {count} from 'rxjs/operator/count';

describe('to-do-app App', () => {
  let page: AppPage;
  const toDoManagerCompTag = 'app-to-do-manager';

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show ToDo Manager list', () => {
    page.navigateTo();
    const firstListName = 'SHOPPING LIST';

    /**
     * Test to check if ToDoManager list is all being displayed
     */
    expect(page.getTextContentOf(toDoManagerCompTag, '#listToDoElement')).toContain(firstListName);
    // should have 3 lists
    expect(page.getAllLiElement().count()).toBe(3);
  });

  /**
   * Test for addList
   */
  it('should add a new list and increment list length', async() => {
    page.navigateTo();
    page.addNewList('List');

    expect(page.getAllLiElement().count()).toBe(4);
  });

  it('should not add a new list with blank name and keep the same list length', async() => {
    page.navigateTo();
    page.addNewList('');

    expect(page.getAllLiElement().count()).toBe(3);
  });

  it('should not add a new list with name with space and keep the same list length', async() => {
    page.navigateTo();
    page.addNewList(' ');

    expect(page.getAllLiElement().count()).toBe(3);
  });

  /**
   * Test for deleteList
   */
  it('should delete a list and decrement list length', async() => {
    page.navigateTo();
    page.deleteList();

    expect(page.getAllLiElement().count()).toBe(2);
  });

  /**
   * Test for editList
   */
  it('should edit a list name', async() => {
    page.navigateTo();
    // All caps because uppercase angular pipe is used on list name in To Do Manager view
    const newName = 'LISTEDITED';
    page.editListName(newName);

    const EditedListName = page.getTextContentOf(toDoManagerCompTag, '#listToDoElement');
    expect(EditedListName).toContain(newName);
  });

  it('should not edit list name if blank space', async() => {
    page.navigateTo();
    const blankName = '';
    page.editListName(blankName);

    const EditedListName = page.getTextContentOf(toDoManagerCompTag, '#listToDoElement');
    expect(EditedListName).not.toBe(blankName);
  });

  it('should not edit list name if blank or only space', async() => {
    page.navigateTo();
    const spacedName = ' ';
    page.editListName(spacedName);

    const EditedListName = page.getTextContentOf(toDoManagerCompTag, '#listToDoElement');
    expect(EditedListName).not.toBe(spacedName);
  });

});
