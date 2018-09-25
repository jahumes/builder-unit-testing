import { Injectable } from '@angular/core';
import {Hour, Project, Task} from "../interfaces/from.interface";
import {Hour as ToHour, Project as ToProject, Task as ToTask} from "../interfaces/to.interface";
import {Timesheet} from "../interfaces/to.interface";

interface ParsedHour {
  projectId: string;
  taskId: string;
  id: string;
  amount: number;
  entryDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class HoursTasksToTimesheetService {

  constructor() {}

  transform(hours: Hour[], tasks: Task[]): Timesheet {
    let {parsedHours, hourTasks} = this._parseHours(hours);
    let allTasks = tasks.concat(hourTasks);

    let timesheet = this._sortTasksByProjectAndPortfolio(allTasks, parsedHours);

    return {
      data: timesheet,
    };
  }

  private _sortTasksByProjectAndPortfolio(tasks: Task[], hours: {[key: string]: ToHour[]}): ToProject[] {
    let projects: {[key: string]: ToProject} = {};

    for (let fromTask of tasks) {
      let {task, project} = this._parseTask(fromTask);

      this._addProjectIfDoesNotExist(projects, project, hours);
      this._addTaskIfDoesNotExist(projects, project, task, hours);
    }

    return Object.values(projects);
  }

  private _addTaskIfDoesNotExist(projects: {[key: string]: ToProject}, project: ToProject, task: ToTask, hours: {[key: string]: ToHour[]}): void {
    let existingTask = projects[project.id].tasks.find((projectTask) => task.id === projectTask.id);

    let hourReference = this._getHourReference(project.id, task.id);

    if (hours.hasOwnProperty(hourReference)) {
      task.hours = hours[hourReference];
    }

    if (!existingTask) {
      projects[project.id].tasks.push(task);
    }
  }

  private _addProjectIfDoesNotExist(projects: {[key: string]: ToProject}, project: ToProject, hours: {[key: string]: ToHour[]}): void {
    if (!projects[project.id]) {
      projects[project.id] = project;
    }

    let hourReference = this._getHourReference(project.id, 'project-level');

    if (hours.hasOwnProperty(hourReference)) {
      projects[project.id].hours = hours[hourReference];
    }
  }

  private _parseTask(task: Task): {task: ToTask, project: ToProject} {
    let project: ToProject = {
      ...task.project,
      tasks: [],
      hours: []
    };

    let parsedTask: ToTask = {
      id: task.id,
      name: task.name,
      hours: []
    };

    return {task: parsedTask, project};
  }

  private _parseHours(hours: Hour[]): {parsedHours: {[key: string]: ToHour[]}, hourTasks: Task[]} {
    let parsedHours: {[key: string]: ToHour[]} = {};
    let tasks: {[key: string]: Task}  = {};

    for (let hour of hours) {
      if (!hour.task) {
        hour.task = {
          id: 'project-level',
          name: 'Project Level',
          project: hour.project
        };
      }

      let taskId = hour.task.id;
      let projectId = hour.project.id;
      let hourReference = this._getHourReference(projectId, taskId);

      if (!parsedHours[hourReference]) {
        parsedHours[hourReference] = [];
      }

      tasks[hourReference] = {...hour.task};

      parsedHours[hourReference].push({
        id: hour.id,
        amount: hour.amount,
        entryDate: hour.entryDate
      });
    }

    let hourTasks = Object.values(tasks);

    return {parsedHours, hourTasks};
  }

  private _getHourReference(projectId: string, taskId: string): string {
    return projectId + '.' + taskId;
  }

}
