import {BaseBuilder} from "../../../test-helpers/builders/base.builder";
import {Company} from "../interfaces/from.interface";
import {BaseWithIdBuilder} from "./base-with-id.builder";


export class CompanyBuilder extends BaseWithIdBuilder implements Company {
  name: string;

  constructor() {
    super();
    this.id = this.randomId();
    this.name = this.randomString(10);
  }

  withName(name: string): this {
    this.name = name;

    return this;
  }

  buildObject(): { [p: string]: any } {
    return {
      id: this.id,
      name: this.name
    };
  }
}
