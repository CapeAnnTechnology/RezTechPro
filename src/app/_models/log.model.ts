export class LogModel {
  constructor(
    public timestamp: Date,
    public ipAddress: string,
	public userAgent: string,
	public referrer: string,
	public action?: string,
	public data?: string,
	public viewPublic?: boolean,
	public additional?: any[],
	public fileName?: string,
	public level?: number,
	public lineNumber?: string,
	public message?: string,
    public _id?: string
  ) { }
}
