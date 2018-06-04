import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, firstName: 'Johnny', lastName: 'Walker', emailAddress: 'johnny@walker.com', phoneNumber: '9785554321', gender: 'men', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 2, firstName: 'Jose', lastName: 'Cuervo', emailAddress: 'jose.cuervo@gmail.com', phoneNumber: '9785554321', gender: 'men', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 3, firstName: 'Julia', lastName: 'Cuervo', emailAddress: 'juliacuervo86@gmail.com', phoneNumber: '9785554321', gender: 'women', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 4, firstName: 'Thomas', lastName: 'Franqui', emailAddress: 'ThomasAFranqui@armyspy.com', phoneNumber: '9785554321', gender: 'men', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 5, firstName: 'Blake', lastName: 'Stamper', emailAddress: 'blakes@teleworm.us', phoneNumber: '9785554321', gender: 'men', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 6, firstName: 'Lisa', lastName: 'Freeland', emailAddress: 'lisafree@gmail.com', phoneNumber: '9785554321', gender: 'women', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },      
    ];

    const venues = [
      {id: 1, businessName: 'John\'s Bar', addressID: 1, phoneNumber: '9785551212', faxNumber: '9785551222', createdAt: '12:45pm 06/03/2018', createdBy: '-1'},
      {id: 2, businessName: 'Jack\'s Bar', addressID: 2, phoneNumber: '9785551212', faxNumber: '9785551222', createdAt: '12:45pm 06/03/2018', createdBy: '-1'},
      {id: 3, businessName: 'Jose\'s Hideaway', addressID: 3, phoneNumber: '9785551212', faxNumber: '9785551222', createdAt: '12:45pm 06/03/2018', createdBy: '-1'},     
    ];

    const addresses = [
      {id: 1, streetAddress: '123 Main St.', city: 'Danvers', state: 'MA', zipCode: '01928', createdAt: '12:52pm 06/04/2018', createdBy: 1},
      {id: 2, streetAddress: '1759 Columbia Mine Road', city: 'Peabody', state: 'MA', zipCode: '01928', createdAt: '12:52pm 06/04/2018', createdBy: 1},
      {id: 3, streetAddress: '4741 Poplar Chase Lane', city: 'Salem', state: 'MA', zipCode: '01928', createdAt: '12:52pm 06/04/2018', createdBy: 1},
      {id: 4, streetAddress: '2417 Davisson Street', city: 'Essex', state: 'MA', zipCode: '01928', createdAt: '12:52pm 06/04/2018', createdBy: 1},
      {id: 5, streetAddress: '450 Ingram Street', city: 'Ipswich', state: 'MA', zipCode: '01928', createdAt: '12:52pm 06/04/2018', createdBy: 1},
      {id: 6, streetAddress: '123 Main St.', city: 'Rowley', state: 'MA', zipCode: '01928', createdAt: '12:52pm 06/04/2018', createdBy: 1},
    ]

    const files = [
      {id: 1, fileName: 'crowd control manager 2017.pdf', filePath: '3/b/crowd control manager 2017.pdf', mimeType: 'application/pdf'}
    ]

    return {users, venues, addresses, files};
  }
}
















