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
    public userId: string,
    public venueId: string,
    public title: string,
    public location: string,
    public question1?: string,
    public question2?: string,
    public question3?: string,
    public question4?: string,
    public description?: string
  ) { }
}

export { ChecklistModel, FormChecklistModel };