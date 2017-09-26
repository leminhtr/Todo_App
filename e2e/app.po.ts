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

  getDOMTextContent(componentSelector: string, elem: string) {
    return this.getDOMElement(componentSelector, elem).getText();
  }

  getAllLiElement() {
    return element.all(by.css('li'));
  }
  getLiElement(repeat: string, index: number) {
    return element.all(by.repeater(repeat)).get(index);
  }

  deleteList() {
    // get delete button to enter edit list name mode
    const deleteButton = element(by.css('.remove'));
    deleteButton.click();
  }

  addNewList(listName: string) {
    const input = element(by.css('#inputList'));
    input.sendKeys(listName);
    // get edit button to enter edit list name mode
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
}
