export class VenueModel {
  constructor(
    public businessId: string,
    public name: string,
    public location: string,
    public phoneNumber: string,
    public viewPublic: boolean,
    public description?: string,
    public _id?: string,
    public faxNumber?: string,
    public comments?: string,
  ) { }
}

// businessId: { type: String, required: true },
// title: { type: String, required: true },
// location: { type: String, required: true },
// phoneNumber: { type: String, required: true },
// faxNumber: String,
// comments: String

// {
// 	"ID": "1212",
// 	"venueID": "1212",
// 	"name": "Schneider Inc",
// 	"email": "Gabrielle.Wisozk38@gmail.com",
// 	"phoneNumber": "(823) 797-4227 x60881",
// 	"faxNumber": "593-038-6359",
// 	"addressID": 24528,
// 	"address": {
// 		"ID": 24528,
// 		"adddressID": 24528,
// 		"streetAddress": "764 Satterfield Ways",
// 		"secondaryAddress": "Apt. 393",
// 		"city": "South Della",
// 		"county": "Cambridgeshire",
// 		"state": "Delaware",
// 		"zipCode": "83849-8706",
// 		"country": "Panama",
// 		"phoneNumber": "208.794.7528 x9251"
// 	},
// 	"createdAt": "2018-04-02T20:20:03.562Z",
// 	"createdBy": 54303
// }
