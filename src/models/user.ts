export class User  {
    id: Number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;

    constructor(id: Number, first_name: string, last_name: string, email:string, avatar:string) {
      this.id = id;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
      this.avatar = avatar;
    }
}