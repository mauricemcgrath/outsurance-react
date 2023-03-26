import { User } from "../../models/user";
import axios from 'axios';

const userUrl:string  = "https://reqres.in/api/users?page=2";

export function fetchUsers() {

  return new Promise<{ data: User[] }>(resolve =>
    axios.get(userUrl)
    .then(res => {
      resolve({data:res.data.data})
    }))
}

