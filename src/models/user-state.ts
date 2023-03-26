import { User } from "./user";
export class UserState  {
    list: User[];

    constructor(list:User[]) {
      this.list = list;
    }
}