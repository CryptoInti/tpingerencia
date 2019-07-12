import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  displayedColumns: string[] = ['_id', 'created_at', 'author', 'action'];
  // x: any = '';
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getAllData();
    console.log(this.myDataArray)
  }
  getAllData() {
    console.log("in getAllData()")
  return this.http.get<any[]>(this.allDataUrl)
           .subscribe(
             data => {
               this.myDataArray = data;
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

}
