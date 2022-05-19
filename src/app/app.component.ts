import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor( private fs: AngularFirestore  ){}


  ngOnInit(): void {
    this.fs.collection('test').snapshotChanges().subscribe(data => {
      console.log(data.map(x => x.payload.doc.data()));
    });
  }


  title = 'ecommerce-angular-app';
}
