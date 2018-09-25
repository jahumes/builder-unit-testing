import {Portfolio} from "../interfaces/from.interface";
import {BaseWithIdBuilder} from "./base-with-id.builder";


export class PortfolioBuilder extends BaseWithIdBuilder implements Portfolio {
  name: string;

  withName(name: string): this {
    this.name = name;

    return this;
  }

  protected buildObject(): { [p: string]: any } {
    return {
      id: this.id,
      name: this.name
    };
  }

}
