class ChecklistModel {
  constructor(
    public title: string,
    public location: string,
    public timestamp: Date,
    public viewPublic: boolean,
    public venueId: Object,
    public userId: Object,
    public description?: string,
    public version?: string,
    public ipAddress?: string,
    public _id?: string,
  ) { }
}

class FormChecklistModel {
  constructor(
    public title: string,
    public location: string,
    public startDate: string,
    public startTime: string,
    public endDate: string,
    public endTime: string,
    public viewPublic: boolean,
    public description?: string
  ) { }
}

export { ChecklistModel, FormChecklistModel };