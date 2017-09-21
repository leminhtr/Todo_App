// Define the custom class for To Do


export class ToDo {
  /**
   * @constructor
   * @param {number} id: The id of the ToDo
   * @param {string} task: The task of the ToDo
   * @param {boolean} IsCompleted: Is the ToDo completed
   */
  constructor(public id: number,
  public task: string,
  public IsCompleted: boolean
  ) {}
}
