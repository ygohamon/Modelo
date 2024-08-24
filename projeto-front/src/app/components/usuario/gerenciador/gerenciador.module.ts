import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {ChartModule} from 'primeng/chart';
import {KnobModule} from 'primeng/knob';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {CarouselModule} from 'primeng/carousel';
import {ProgressBarModule} from 'primeng/progressbar';
import {AvatarModule} from 'primeng/avatar';
import {TimelineModule} from 'primeng/timeline';
import {BadgeModule} from 'primeng/badge';
import {TabViewModule} from "primeng/tabview";
import {CardModule} from "primeng/card";
import {CalendarModule} from "primeng/calendar";
import {FileUploadModule} from "primeng/fileupload";
import {ToggleButtonModule} from "primeng/togglebutton";
import {AutoCompleteModule} from "primeng/autocomplete";
import {OrganizationChartModule} from "primeng/organizationchart";
import {TreeModule} from "primeng/tree";
import {DataViewModule} from "primeng/dataview";
import {GerenciadorComponent} from "./gerenciador.component";
import {ToastModule} from "primeng/toast";
import {LoaderModule} from "../../loader/loader.module";
import {GerenciadorRoutingModule} from "./gerenciador-routing.module";

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ChartModule,
    RatingModule,
    KnobModule,
    CarouselModule,
    ProgressBarModule,
    AvatarModule,
    TimelineModule,
    BadgeModule,
    TabViewModule,
    CardModule,
    CalendarModule,
    FileUploadModule,
    ToggleButtonModule,
    AutoCompleteModule,
    OrganizationChartModule,
    TreeModule,
    DataViewModule,
    ToastModule,
    LoaderModule,
    GerenciadorRoutingModule
  ],
  declarations: [GerenciadorComponent]
})
export class GerenciadorModule {}
