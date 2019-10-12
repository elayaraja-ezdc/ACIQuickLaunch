import { Onboard } from '../../model/onboard';
import { AciextService } from '../../service/aciext.service';
import { Component, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';

//Added by Elaya for clr-radio 
//import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {ViewChild} from "@angular/core";
import {ClrWizard} from "@clr/angular";


@Component({
  selector: 'onboard-component',
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css'],
  host: { 'class': 'content-container' },
  providers: [AciextService]
})

export class OnboardComponent implements OnInit {
  orgName: string;
  onboards: Onboard[];
  tokens: [];
  vcdToken: String;
  vcdUrlToken: String;
  tenantsData: [];
  selectedOnboard: Onboard;
  onboarddatagridloading: boolean = false;
  onboardaddmodal: boolean = false;
  onboarddetailsmodal: boolean = false;
  showOnboardAcknowledge: boolean = false;

  tenantName: string;
  vrfName: string;
  BDName: string;
  BDName2: string;
  ip1: string;
  ip2: string;  
  bdName2: string;
  ip3: string;
  ip4: string;
  AppEPGName: string;
  vmm_encp_vlan: string;
  vmm_domain_name: string;
  AppEPGName2: string;
  vmm_encp_vlan2: string;
  vmm_domain_name2: string;
  filterName: string;
  dFromPort: string;
  dToPort: string;
  etherT: string;
  protocol: string;
  contractName: string;
  contractSubjectName: string;
  contractFilterName: string;
  contractFilterName1: string;
  contractFilterName2: string;
  providedContract: string;
  consumedContract: string;
  UnicastRouting: boolean;
  L2UnknownUnicast: string;
  ARPFlooding: boolean;
  source_epgName: string;
  dest_epgName: string;
  ApplicationProfileName: string;
  

  onboardaddform = new FormGroup({
    tenantName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    vrfName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    BDName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    BDName2: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    ip1: new FormControl('', [Validators.required,Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/\d+$/)]),
    ip2: new FormControl('', [Validators.required,Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/\d+$/)]),
    ip3: new FormControl('', [Validators.required,Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/\d+$/)]),
    ip4: new FormControl('', [Validators.required,Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/\d+$/)]),
    ApplicationProfileName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    AppEPGName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    vmm_encp_vlan: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    vmm_domain_name: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    AppEPGName2: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    vmm_encp_vlan2: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    vmm_domain_name2: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    filterName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    dFromPort: new FormControl('', [Validators.required]),
    dToPort: new FormControl('', [Validators.required]),
    etherT: new FormControl('', [Validators.required]),
    protocol: new FormControl('', [Validators.required]),
    contractName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    contractSubjectName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    contractFilterName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    contractFilterName1: new FormControl(''),
    contractFilterName2: new FormControl(''),
    L2UnknownUnicast: new FormControl('proxy'),
    providedContract: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    UnicastRouting: new FormControl(true),
    consumedContract: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    ARPFlooding: new FormControl(true),
    source_epgName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)]),
    dest_epgName: new FormControl('', [Validators.required,Validators.pattern(/^[a-zA-Z0-9_.-]*$/),Validators.maxLength(25)])
    
  });

  
  constructor(private aciextService: AciextService) { }

  @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;
     xlOpen: boolean = false;
     skipStepTwo: boolean = true;

     toggleStepTwo() {
      this.skipStepTwo = !this.skipStepTwo;
    }

     openWizardModal() {
      this.xlOpen = !this.xlOpen;
    }


  ngOnInit(): void {
    //this.getOnboards();
    this.getCurrentOrgName();
  }

  openOnboardModal() {
    this.onboardaddmodal = true;
    //this.onboardaddform.reset();
  }

  getCurrentOrgName(): void {
    this.onboarddatagridloading = true;
    this.aciextService.getOrgPath().subscribe(orgName => {
      console.log("Get the organisation name of VCD:"+orgName);
      this.orgName = orgName;
      this.tenantName = orgName;
      this.onboarddatagridloading = false;
    }, (err) => {
      console.log("Get organisation error "+err);
      this.onboarddatagridloading = false;
    });
  }

  

  // Tenant Creation form submit
  createOnboardSubmit() {
    if (this.onboardaddform.valid) {
      this.onboarddatagridloading = true;
      this.onboardaddmodal = false;
      var jsonData = this.onboardaddform.value;
      console.log("Current Org Name:-->"+this.OrgName);
      jsonData["operation"] = "TenantOnboard";
      this.aciextService.addOnboard(JSON.stringify(this.onboardaddform.value)).subscribe(res => {
        console.log("Tenant Onboard Creation response Text"+JSON.stringify(res));
        this.onboardaddform.reset();
        this.onboarddatagridloading = false;
        //this.getOnboards();
      }, (err) => {
        //this.getOnboards();
        this.showOnboardAcknowledge = true;
        this.onboarddatagridloading = false;
      });
    }
  }

  createOnboardCancel(form: NgForm) {
    this.onboardaddmodal = false;
    form.reset();
  }

  closeOnboardAckAlert() {
    this.showOnboardAcknowledge = false;
  }


  isInvalid(form: FormGroup, control: string): boolean {
    if(form && form.controls[control]) {
      return form.controls[control].invalid && form.controls[control].touched
    }
    return false;
  }
}
