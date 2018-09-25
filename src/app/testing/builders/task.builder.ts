import {Task} from "../interfaces/from.interface";
import {ProjectBuilder} from "./project.builder";
import {BaseWithIdBuilder} from "./base-with-id.builder";
import {PortfolioBuilder} from "./portfolio.builder";


export class TaskBuilder extends BaseWithIdBuilder {
  project: ProjectBuilder;
  name: string;

  constructor() {
    super();
    this.id = 'defaultId';
    this.name = 'Default Task';
    this.project = ProjectBuilder.init();
  }

  // withPortfolio(portfolio: PortfolioBuilder): this {
  //   this.project.withPortfolio(portfolio);
  //
  //   return this;
  // }
  //
  // withPortfolioId(portfolioId: string): this {
  //   this.project.withPortfolioId(portfolioId);
  //
  //   return this;
  // }

  withProject(project: ProjectBuilder): this {
    this.project = project;

    return this;
  }

  withProjectId(projectId: string): this {
    this.project.withId(projectId);

    return this;
  }

  // withCompanyId(companyId: string): this {
  //   this.project.withCompanyId(companyId);
  //
  //   return this;
  // }

  // withIds(id: string, projectId: string, portfolioId: string, companyId: string): this {
  withIds(id: string, projectId: string): this {
    this.id = id;
    this.withProjectId(projectId);
    // this.withPortfolioId(portfolioId);
    // this.withCompanyId(companyId);

    return this;
  }

  build(): Task {
    return {
      id: this.id,
      name: this.name,
      project: this.project.build()
    };
  }
}
