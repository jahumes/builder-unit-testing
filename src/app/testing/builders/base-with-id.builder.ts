import {BaseBuilder} from "../../../test-helpers/builders/base.builder";

export abstract class BaseWithIdBuilder extends BaseBuilder {
  id: string;
  fields: { [p: string]: any };

  protected randomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  protected randomString(len: number) {
    let text = "";

    let charset = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < len; i++) {
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return text;
  }

  withId(id: string): this {
    this.id = id;

    return this;
  }

  withField(key: string, value: any): this {
    this.fields[key] = value;

    return this;
  }
}
