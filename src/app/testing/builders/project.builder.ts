import {Project} from "../interfaces/from.interface";
import {CompanyBuilder} from "./company.builder";
import {PortfolioBuilder} from "./portfolio.builder";
import {BaseWithIdBuilder} from "./base-with-id.builder";


export class ProjectBuilder extends BaseWithIdBuilder {
  // company: CompanyBuilder;
  // portfolio: PortfolioBuilder;
  name: string;

  constructor() {
    super();
    this.id = 'defaultId';
    this.name = 'Default Project';
    // this.portfolio = PortfolioBuilder.init();
    // this.company = CompanyBuilder.init();
  }

  // withPortfolio(portfolio: PortfolioBuilder): this {
  //   this.portfolio = portfolio;
  //
  //   return this;
  // }
  //
  // withPortfolioId(portfolioId: string): this {
  //   this.portfolio.withId(portfolioId);
  //
  //   return this;
  // }
  //
  // withCompany(company: CompanyBuilder): this {
  //   this.company = company;
  //
  //   return this;
  // }

  // withCompanyId(companyId: string): this {
  //   this.company.withId(companyId);
  //
  //   return this;
  // }

  build(): Project {
    return {
      id: this.id,
      name: this.name
      // portfolio: this.portfolio.build(),
      // company: this.company.build()
    };
  }

}
