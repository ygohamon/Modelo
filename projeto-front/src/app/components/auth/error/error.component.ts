import { Component } from '@angular/core';
import {LayoutService} from "../../../layout/service/app.layout.service";

@Component({
    templateUrl: './error.component.html',
    styleUrl: '../style.scss'
})
export class ErrorComponent {
    constructor(public layoutService: LayoutService){

    }
}
