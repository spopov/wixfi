export interface IHeaderButton {
    name: string;
    path: string;
}
export class HeaderItems implements IHeaderButton {
    constructor(public name: string, public path: string) {
    }
}

export const owner: IHeaderButton = new HeaderItems('Owner', '/owner')
export const propertyManager = new HeaderItems('Property Manager', '/property-manager')
export const tenant = new HeaderItems('Tenant', '/tenant')
export const expert = new HeaderItems('Expert', '/expert')
export const support = new HeaderItems('Support', '/support')