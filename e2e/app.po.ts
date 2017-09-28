import { browser, by, element } from 'protractor';
import {totalmem} from "os";

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

  getNthListToDoTextContent(nth: number) {
    const toDoManagerCompTag = 'app-to-do-manager';
    return element.all(by.css(toDoManagerCompTag + ' ' + '#ToDoManagerList li')).get(nth).getText();
  }
  // return element.all(by.css(toDosCompTag + ' ' + '#toDosList li')).get(nth).getText();


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
    const toDosCompTag = 'app-to-dos';
    const input = this.getDOMElement(toDosCompTag, '#inputNewToDo' );
    input.sendKeys(newToDo);
    const addButton = this.getDOMElement(toDosCompTag, '#addToDoButton' );
    addButton.click();
  }

  deleteToDo() {
    // get delete toDo button
    const toDosCompTag = 'app-to-dos';
    // const deleteButton = this.getDOMElement(toDosCompTag, '#deleteToDoNotSelect' );
    const deleteButton = this.getDOMElement(toDosCompTag, '.remove' );
    deleteButton.click();
  }

  editToDoTask(newToDo: string) {
    const toDosCompTag = 'app-to-dos';
    const editButton = this.getDOMElement(toDosCompTag, '#editButton' );
    editButton.click();
    const input = this.getDOMElement(toDosCompTag, '#inputEdit' );
    input.sendKeys(newToDo);
    const editConfirmButton = this.getDOMElement(toDosCompTag, '#confirmEditButton' );
    editConfirmButton.click();
  }

  getNthToDoTextContent(nth: number) {
    const toDosCompTag = 'app-to-dos';
    return element.all(by.css(toDosCompTag + ' ' + '#toDosList li')).get(nth).getText();
  }

  getNthCheckboxToDo(nth: number) {
    const toDosCompTag = 'app-to-dos';
    return element.all(by.css(toDosCompTag + ' ' + '#tdCheckbox li [type="checkbox"]')).get(nth);
  }

  getAllCheckboxToDo() {
    const toDosCompTag = 'app-to-dos';
    return element.all(by.css(toDosCompTag + ' ' + '#tdCheckbox li [type="checkbox"]'));
  }

  // getNumberOfToDos(): number {
  //   let totalNumberOfTodos: number;
  //   this.getToDosList().count()
  //     .then(function (numberOfToDos: number) {
  //       return numberOfToDos;
  //     });
  // }
  getFirstUncheckedCheckbox(): number {
    let firstUncheckedCheckbox = -1;
    const self = this;
    this.getToDosList().count()
      .then(function(totalNumberOfToDos) {
        for (let i = 0 ; i < totalNumberOfToDos ; i++) {
          let nthCheckbox = self.getNthCheckboxToDo(i);
          nthCheckbox.isSelected()
            .then(function (checkboxValue) {
              // if a checkbox is unchecked
              if (checkboxValue === false) {
                // return its position (being the first position)
                firstUncheckedCheckbox = i;
                return firstUncheckedCheckbox;
              }
            });
        }
        return firstUncheckedCheckbox;
      });

    // if all checkbox are checked
    return firstUncheckedCheckbox;
  }

  isThereUncheckedCheckbox(): boolean {
    let isThereUnchecked = false;
    const self = this;
    this.getToDosList().count()
      .then(function(totalNumberOfToDos) {
        for (let i = 0 ; i < totalNumberOfToDos ; i++) {
          self.getNthCheckboxToDo(i).isSelected()
            .then(function (checkboxValue) {
              // if a checkbox is unchecked
              if (checkboxValue === false) {
                // return its position (being the first position)
                // expect(4).toBe(5);
                isThereUnchecked = true;
                return isThereUnchecked;
              }
            });
        }
        return isThereUnchecked;
      });

    // if all checkbox are checked
    return isThereUnchecked;
  }
}
