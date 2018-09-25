
export interface Timesheet {
    data: Project[];
}

export interface Company {
    id: string;
    name: string;
    portfolios: Portfolio[];
}

export interface Portfolio {
    id: string;
    name: string;
    projects: Project[];
}

export interface Project {
    id: string;
    name: string;
    tasks: Task[];
    hours: Hour[];
}

export interface Task {
    id: string;
    name: string;
    hours: Hour[];
}

export interface Hour {
    id: string;
    amount: number;
    entryDate: string;
}
