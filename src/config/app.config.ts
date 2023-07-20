interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Owner', 'Manager', 'Staff Member'],
  tenantName: 'Hotel',
  applicationName: 'Verma Guest House',
  addOns: ['chat', 'notifications', 'file'],
};
