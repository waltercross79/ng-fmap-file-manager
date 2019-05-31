import { Component, OnInit } from '@angular/core';
import {  ActivatedRouteSnapshot, NavigationExtras, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // get the url from the router; redirect to filter route
    let filename = this.route.queryParamMap.subscribe(p => {
      let filename = p.get('filename');

      console.log('SearchingComponent.ngOnInit().callback:' + filename)

      let navigationExtras: NavigationExtras = {
        queryParams: { 'filename': filename }
      };

      this.router.navigate(['/files/search/filter'], navigationExtras);
    });    
  }

}
