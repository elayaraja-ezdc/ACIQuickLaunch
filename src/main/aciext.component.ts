import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'aciext-component',
    templateUrl: './aciext.component.html',
    host: { 'class': 'content-container' }
})
export class AciextComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
        const route = this.router.url.split(/\/aciext/)[0];
        const aciext = this.router.url.split(/\/aciext/)[1]
        console.log("route :", route, "aciext : ", aciext);
        if (!/\/onboard/.test(aciext)) {
            console.log("ici : ", route + '/aciext/onboard');
            this.router.navigateByUrl(route + '/aciext/onboard');
        }
    }
}