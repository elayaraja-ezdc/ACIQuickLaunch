
export class Onboard {
  tenantName: string;
  description: string;
  display_name: string;
  password: string;

  constructor(tenantName: string, display_name: string, description: string, password: string) {
    this.tenantName = tenantName;
    this.display_name = display_name;
    this.description = description;
    this.password = password;
  }
}
