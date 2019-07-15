import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontent';
  localhost = 'http://localhost:3000/';
  allDataUrl = 'http://localhost:3000/hits';
  myDataArray: any[] = [];
  displayedColumns: string[] = ['story_title', 'author', 'created_at', 'action'];
  // x: any = '';
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getUpApi();
    this.getAllData();
    //console.log(this.myDataArray)
  }
  getAllData() {
    console.log("in getAllData()")
  return this.http.get<any[]>(this.allDataUrl)
           .subscribe(
             data => {
               // console.log("data:"+JSON.stringify(data,null,4));
               this.myDataArray = data;
               //this.myDataArray.created_at_m = moment(data.created_at);
             },
             err => console.error(err)
           );
  }
  deleteHit(_id: number) {
    console.log(this.localhost+"hits/"+_id);

    this.http.put<any[]>(this.localhost+"hits/"+_id,{"is_delete" : "true"})
            .subscribe(data => {this.getAllData();console.log("PUT "+data);}, error => {console.error(error);});

  return setTimeout(() => {this.getAllData()},100);
  }
  getUpApi() {
    console.log("getUpApi...")
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
    return this.http.post(this.localhost+"getfromapi",{"getUpApi":"true"}, {headers: headers})
            .subscribe(data => {console.log(data)});
  }

}
