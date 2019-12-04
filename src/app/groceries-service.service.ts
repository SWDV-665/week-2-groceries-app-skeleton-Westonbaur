import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class GroceriesServiceService {
  
  items: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>

  baseURL = "http://127.0.0.1:8080";


  constructor(public http: HttpClient) { 
    console.log('Hello GroceriesServiceProvider Provider')

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();

  }

 getItems(): Observable<object []> {
    return this.http.get(this.baseURL + '/api/groceries').pipe(
      map(this.extractData.bind(this),
      catchError(this.handleError)
      ));
  }


private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  
private handleError(error: Response | any) {
  let errMsg = String;
  if (error instanceof Response) {
    const err = error || '';
    //errMsg = '${error.status} - ${error.statusText || ''} ${err}';
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}

  async removeItem(id) {
    console.log("### Remove Item - id = ", id);
    this.http.delete(this.baseURL + "api/groceries/" + id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  addItem(item) {
   this.http.post(this.baseURL + "/api/groceries", item).subscribe(res => {
     this.items = res;
     this.dataChangeSubject.next(true);
   });
  }

  editItem(item, index){
    console.log("Editing ITem = ", item);
    this.http.put(this.baseURL + "api/groceries/" + item.id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

}
