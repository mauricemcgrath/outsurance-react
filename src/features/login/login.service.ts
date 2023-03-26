
import { Subject } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { take } from "rxjs/operators";
    
export default class LoginService {

  public loggedInSubject: Subject<boolean> = new Subject<boolean>();

  public tokenName = "token";

  private loginUrl = "https://reqres.in/api/login";
    
  public userLogin(email: string, password:string) {

        return fromFetch(this.loginUrl, {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
          }).pipe(take(1));   
    }
}


    

