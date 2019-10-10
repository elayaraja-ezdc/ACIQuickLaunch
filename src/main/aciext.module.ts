import { AciextComponent } from './aciext.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule}  from '@angular/forms';
import {Inject, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {EXTENSION_ROUTE, ExtensionNavRegistration, ExtensionNavRegistrationAction} from '@vcd-ui/common';
import {OnboardComponent} from './business/onboard/onboard.component';
import {ROUTES} from './aciext.routes';


import {ClarityModule} from 'clarity-angular';
import { MenuComponent } from './business/menu.component/menu.component';

//Added by Elaya for clr-radio 
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
    imports: [
        ClarityModule,
        CommonModule,
        RouterModule.forChild(ROUTES),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        OnboardComponent,
        MenuComponent,
        AciextComponent       
    ],
    bootstrap: [
        OnboardComponent,
        AciextComponent
    ],
    //Added by Elaya for clr-radio
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AciextModule {
    constructor(private appStore: Store<any>, @Inject(EXTENSION_ROUTE) extensionRoute: string) {
        const registration: ExtensionNavRegistration = {
            icon: '',
            path: extensionRoute,
            nameCode: 'nav.aciext',
            descriptionCode: 'nav.aciext.description'
        };
        appStore.dispatch(new ExtensionNavRegistrationAction(registration));
    }
}
