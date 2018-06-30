export class BusinessModel {
  constructor(
    public name: string,
    public location: string,
    public phoneNumber: string,
    public faxNumber?: string,
    public comments?: string,
    public _id?: string,
    public description?: string
  ) { }
}
