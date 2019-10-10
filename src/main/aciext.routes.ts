import { Route } from '@angular/router';
import { OnboardComponent } from './business/onboard/onboard.component';
import { AciextComponent } from './aciext.component';


export const ROUTES: Route[] = [
    {
        path: '',
        component: AciextComponent,
        children: [
            { path: 'onboard', component: OnboardComponent },
            { path: '**', redirectTo: 'nasServer' }
        ]
    }
];
