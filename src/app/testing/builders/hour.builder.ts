import {Hour} from "../interfaces/from.interface";
import {TaskBuilder} from "./task.builder";
import {ProjectBuilder} from "./project.builder";
import {BaseWithIdBuilder} from "./base-with-id.builder";


export class HourBuilder extends BaseWithIdBuilder {
  project: ProjectBuilder;
  task: TaskBuilder;
  amount: number;
  entryDate: string;

  constructor() {
    super();
    this.id = 'defaultId';
    this.project = ProjectBuilder.init();
    this.task = null;
    this.amount = 0;
    this.entryDate = '2018-01-01';
  }

  withProject(project: ProjectBuilder): this {
    this.project = project;

    return this;
  }

  withProjectId(projectId: string): this {
    this.project.withId(projectId);

    return this;
  }

  withTaskId(taskId: string): this {
    if (!this.task) {
      this.task = TaskBuilder.init();
    }

    this.task.withId(taskId);

    return this;
  }

  withTask(task: TaskBuilder): this {
    this.task = task;

    return this;
  }

  withAmount(amount: number): this {
    this.amount = amount;

    return this;
  }

  withEntryDate(entryDate: string): this {
    this.entryDate = entryDate;

    return this;
  }

  build(): Hour {
    return {
      id: this.id,
      amount: this.amount,
      entryDate: this.entryDate,
      project: this.project.build(),
      task: this.task ? this.task.build() : this.task
    };
  }
}
