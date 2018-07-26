export class InspectionModel {
  constructor(
    public type: string,
    public inspectionDatetime: Date,
    public expirationDatetime: Date,
    public venueId: string,
    public userId: string,
    public timestamp: Date,
    public userAgent?: string,
    public viewPublic?: boolean,
    public ipAddress?: string,
    public version?: boolean,
    public _id?: string,
  ) { }
}

// {
//     "_id" : ObjectId("5b4142507039f3f851a8d287"),
//     "type" : "cooking fire suppression system inspection",
//     "inspectionDatetime" : ISODate("2017-03-20T14:00:00.000Z"),
//     "expirationDatetime" : ISODate("2018-03-20T20:00:00.000Z"),
//     "venueId" : ObjectId("5b33cc227039f3f85161a249"),
//     "userId" : ObjectId("5b36ae53cea4550700bfaada"),
//     "timestamp" : ISODate("2018-07-05T14:00:00.000Z"),
//     "userAgent" : "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/64.0.3282.119 Safari/537.36",
//     "viewPublic" : true,
//     "ipAddress" : "147.172.39.129",
//     "version" : "1.1.2015"
// }