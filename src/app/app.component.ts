import { Component,Input,Injectable} from '@angular/core';
import { FormControl } from '@angular/forms';

export type EditorType = 'name' | 'profile';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


@Injectable({
  providedIn: 'root',
})




export class AppComponent {
  
  
  @Input() loggedUserName: String = "Not logged in"


loggedAs="notlogged"
  currentItem = 'Television';
  fontSizePx = 10
  editor: EditorType = 'name';
  name = new FormControl('');
  
  


  updateName() {

  }
}

export class GlobalVar { 

  public static LoggedInStatus = false
  public static TimedOut = true
  // public static RestApiUrl = process.env.RESTAPI_URL || 'http://localhost:3000' // Angular process not working bug?

  //public static RestApiUrl = '//mturcsrestapi.herokuapp.com'
  public static RestApiUrl = 'http://localhost:3000'  
}



