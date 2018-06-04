import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, firstName: 'Johnny', lastName: 'Walker', emailAddress: 'johnny@walker.com', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 2, firstName: 'Jose', lastName: 'Cuervo', emailAddress: 'jose.cuervo@gmail.com', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 3, firstName: 'Julia', lastName: 'Cuervo', emailAddress: 'juliacuervo86@gmail.com', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 4, firstName: 'Thomas', lastName: 'Franqui', emailAddress: 'ThomasAFranqui@armyspy.com', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 5, firstName: 'Blake', lastName: 'Stamper', emailAddress: 'blakes@teleworm.us', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },
      { id: 6, firstName: 'Lisa', lastName: 'Freeland', emailAddress: 'lisafree@gmail.com', createdAt: '12:34pm 06/03/2018', createdBy: '-1' },      
    ];
    return {users};
  }
}
















