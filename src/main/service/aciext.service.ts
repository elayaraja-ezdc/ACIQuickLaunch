import { Onboard } from '../model/onboard';
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthTokenHolderService, API_ROOT_URL } from '@vcd-ui/common';


@Injectable()
export class AciextService {

  private currentOrgId: string;
  private headers: {};

  constructor(
    private http: Http,
    authTokenHolderService: AuthTokenHolderService,
    @Inject(API_ROOT_URL) private apiRootUrl: string) {
    this.headers = { 'headers': { 'x-vcloud-authorization': authTokenHolderService.token, 'Accept': 'application/*+json;version=31.0' } }
  }

  getOrgPath() {
    
	  console.log("Current org id:"+JSON.stringify(this.currentOrgId));
    if (this.currentOrgId) {
      return Observable.of<string>(this.currentOrgId);
    }
    return this.http.get('/api/org', this.headers)
      .map((res: Response) => {
        const orgArray = JSON.parse(res.text()).org;
        console.log("Path ="+document.location.pathname.split(/\/tenant\//)[1].split('/')[0]);
        return document.location.pathname.split(/\/tenant\//)[1].split('/')[0];
      });
  }

  getOrgId() {
    
	  console.log("Current org id:"+JSON.stringify(this.currentOrgId));
    if (this.currentOrgId) {
      return Observable.of<string>(this.currentOrgId);
    }
    return this.http.get('/api/org', this.headers)
      .map((res: Response) => {
        const orgArray = JSON.parse(res.text()).org;
        console.log("Path ="+document.location.pathname.split(/\/tenant\//)[1].split('/')[0]);
        const orgName = document.location.pathname.split(/\/tenant\//)[1].split('/')[0];
        const orgId = orgArray.find((item: any) => item.name === orgName);
        this.currentOrgId = orgId.href.split(/\/org\//)[1];
        return orgId.href.split(/\/org\//)[1];
      });
  }

  
  addOnboard(value: string) {
	 console.log("APi URL"+API_ROOT_URL);
	 console.log("this api"+this.apiRootUrl);
   console.log("Org id:"+this.getOrgId());
   console.log("Current Org ID:"+this.currentOrgId);
	 console.log(value);
    return this.getOrgId()
      .mergeMap(orgId => {
        return this.http
         .post(`${this.apiRootUrl}/api/org/${orgId}/aciext/user`, value, this.headers)
         .map((res: Response) => JSON.parse(res.text()))
         .catch(this.handleError);
      });
  }

}
