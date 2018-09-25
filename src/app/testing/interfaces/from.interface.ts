
export interface Task {
    id: string;
    name: string;
    project: Project;
}

export interface Hour {
    id: string;
    project: Project;
    task?: Task;
    amount: number;
    entryDate: string;
}

export interface Project {
    id: string;
    name: string;
    // company: Company;
    // portfolio: Portfolio;
}

export interface Company {
    id: string;
    fields: {[key: string]: any};
    name: string;
}

export interface Portfolio {
    id: string;
    fields: {[key: string]: any};
    name: string;
}
