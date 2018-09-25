import { TestBed, inject } from '@angular/core/testing';

import { HoursTasksToTimesheetService } from './hours-tasks-to-timesheet.service';
import {TaskBuilder} from "../builders/task.builder";
import {HourBuilder} from "../builders/hour.builder";

describe('HoursTasksToTimesheetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoursTasksToTimesheetService]
    });
  });

  it('should be created', inject([HoursTasksToTimesheetService], (service: HoursTasksToTimesheetService) => {
    expect(service).toBeTruthy();
  }));

  describe('Unit Tests without Builders', () => {
    let service: any;
    beforeEach(inject([HoursTasksToTimesheetService], (transformer: HoursTasksToTimesheetService) => {
      service = (transformer as any);
    }));

    describe('function: _sortTasksByProjectAndPortfolio', () => {
      it('should tasks by their project', () => {
        service._parseTask = jest.fn();
        service._addProjectIfDoesNotExist = jest.fn();
        service._addTaskIfDoesNotExist = jest.fn();
        let parsedTasks = [
          {task: {id: 'taskId1'}, project: {id: 'project1'}},
          {task: {id: 'taskId2'}, project: {id: 'project2'}},
          {task: {id: 'taskId3'}, project: {id: 'project3'}},
          {task: {id: 'taskId4'}, project: {id: 'project4'}}
        ];
        let tasks = [
          {id: 'taskId1'},
          {id: 'taskId2'},
          {id: 'taskId3'},
          {id: 'taskId4'},
        ];

        for (let i = 0; i < tasks.length; i++) {
          service._parseTask.mockReturnValueOnce(parsedTasks[i]);
        }

        service._sortTasksByProjectAndPortfolio(tasks, {});

        expect(service._parseTask.mock.calls.length).toBe(4);
        expect(service._addProjectIfDoesNotExist.mock.calls.length).toBe(4);
        expect(service._addTaskIfDoesNotExist.mock.calls.length).toBe(4);

        for (let i = 0; i < tasks.length; i++) {
          expect(service._parseTask.mock.calls[i][0]).toBe(tasks[i]);
          expect(service._addProjectIfDoesNotExist.mock.calls[i][1]).toBe(parsedTasks[i].project);
          expect(service._addTaskIfDoesNotExist.mock.calls[i][2]).toBe(parsedTasks[i].task);
        }
      });
    });
  });

  describe('Unit Testing with Builders', () => {
    let service: HoursTasksToTimesheetService;
    beforeEach(inject([HoursTasksToTimesheetService], (transformer: HoursTasksToTimesheetService) => {
      service = transformer;
    }));

    it('should nest tasks under their respective projects', () => {

    });

    it('should attach hours to projects and tasks', () => {

    });

    it('should not allow a project or task to be repeated', () => {

    });
  });
});
