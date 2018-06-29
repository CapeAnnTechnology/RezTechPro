import { VenueModule } from './venue.module';

describe('VenueModule', () => {
  let venueModule: VenueModule;

  beforeEach(() => {
    venueModule = new VenueModule();
  });

  it('should create an instance', () => {
    expect(venueModule).toBeTruthy();
  });
});
