import { AppPage } from './app.po';
import {browser, by, element} from 'protractor';
import {async} from '@angular/core/testing';
import {count} from 'rxjs/operator/count';

describe('to-do-app App', () => {
  let page: AppPage;
  const toDosCompTag = 'app-to-dos';

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show To Dos of first list, display the right content/number of ToDos', () => {
    page.navigateTo();

    const firstToDos = 'Coffee';
    // select the first themed list of ToDo
    page.selectFirstList();

    expect(page.getDOMElement(toDosCompTag, '#toDosList').isPresent()).toBe(true);

    // should have a Coffee ToDo
    expect(page.getTextContentOf(toDosCompTag, '#toDosList')).toContain(firstToDos);
    // should have 3 lists
    expect(page.getToDosList().count()).toBe(3);
  });

  it('should not show To Dos of first list', () => {
    page.navigateTo();
    // page.selectFirstList();

    expect(page.getDOMElement(toDosCompTag, '#toDosList').isPresent()).toBe(false);
    // should have 3 lists
    expect(page.getAllLiElement().count()).toBe(3);
  });

  /**
   * Test for addToDo
   */
  it('should add a new toDo and increment list length', async() => {
    page.navigateTo();
    page.selectFirstList();

    page.addNewToDo('newToDo');

    expect(page.getToDosList().count()).toBe(4);
  });

  it('should not add a new toDo with blank name and keep the same list length', async() => {
    page.navigateTo();
    page.selectFirstList();

    page.addNewToDo('');

    expect(page.getToDosList().count()).toBe(3);
  });

  it('should not add a new toDo with name with space and keep the same list length', async() => {
    page.navigateTo();
    page.selectFirstList();

    page.addNewToDo(' ');

    expect(page.getToDosList().count()).toBe(3);
  });

  /**
   * Test for deleteToDo
   */
  it('should delete a toDo and decrement list length', async() => {
    page.navigateTo();
    page.selectFirstList();
    page.deleteToDo();

    expect(page.getToDosList().count()).toBe(2);
  });

  /**
   * Test for editToDo
   */
  it('should edit a toDo', async() => {
    page.navigateTo();
    page.selectFirstList();

    const newName = 'toDoEdited';
    page.editToDoTask(newName);

    const EditedFirstToDo = page.getNthToDoTextContent(0);
    expect(EditedFirstToDo).toContain(newName);
  });

  it('should not edit toDo name if blank space', async() => {
    page.navigateTo();
    page.selectFirstList();

    const blankName = '';
    page.editToDoTask(blankName);

    const EditedToDo = page.getNthToDoTextContent(0);
    expect(EditedToDo).not.toBe(blankName);
  });

  it('should not edit toDo name if only space char', async() => {
    page.navigateTo();
    page.selectFirstList();

    const spacedName = ' ';
    page.editToDoTask(spacedName);
    const EditedToDo = page.getNthToDoTextContent(0);
    expect(EditedToDo).not.toBe(spacedName);
  });



});
