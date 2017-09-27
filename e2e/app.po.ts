import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getDOMElement(componentSelector: string, elem: string) {
    return element(by.css(componentSelector + ' ' + elem));
  }

  getTextContentOf(componentSelector: string, elem: string) {
    return this.getDOMElement(componentSelector, elem).getText();
  }

  getAllLiElement() {
    return element.all(by.css('li'));
  }

  getToDoManagerList() {
    return element.all(by.css('#listToDoElement'));
  }

  getToDosList() {
    return element.all(by.css('#toDoElement'));
  }

  deleteList() {
    // get delete list button
    const deleteButton = element(by.css('.remove'));
    deleteButton.click();
  }

  addNewList(listName: string) {
    const input = element(by.css('#inputList'));
    input.sendKeys(listName);
    const addButton = element(by.css('#addListButton'));
    addButton.click();
  }

  editListName(newName: string) {
    const editButton = element(by.css('#editButton'));
    editButton.click();
    const input = element(by.css('#editListInput'));
    input.sendKeys(newName);
    const editConfirmButton = element(by.css('#editConfirm'));
    editConfirmButton.click();
  }

  selectFirstList() {
    const firstListElement = element(by.css('#listToDoElement'));
    firstListElement.click();
  }

  addNewToDo(newToDo: string) {
    const ToDosCompTag = 'app-to-dos';
    const input = this.getDOMElement(ToDosCompTag, '#inputNewToDo' );
    input.sendKeys(newToDo);
    const addButton = this.getDOMElement(ToDosCompTag, '#addToDoButton' );
    addButton.click();
  }

  deleteToDo() {
    // get delete toDo button
    const ToDosCompTag = 'app-to-dos';
    // const deleteButton = this.getDOMElement(ToDosCompTag, '#deleteToDoNotSelect' );
    const deleteButton = this.getDOMElement(ToDosCompTag, '.remove' );
    deleteButton.click();
  }

  editToDoTask(newToDo: string) {
    const ToDosCompTag = 'app-to-dos';
    const editButton = this.getDOMElement(ToDosCompTag, '#editButton' );
    editButton.click();
    const input = this.getDOMElement(ToDosCompTag, '#inputEdit' );
    input.sendKeys(newToDo);
    const editConfirmButton = this.getDOMElement(ToDosCompTag, '#confirmEditButton' );
    editConfirmButton.click();
  }
}
