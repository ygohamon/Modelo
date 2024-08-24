import { Component } from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
    templateUrl: './accessdenied.component.html',
    styleUrl: '../style.scss',

})
export class AccessdeniedComponent {
    constructor(public layoutService: LayoutService){

    }
}
