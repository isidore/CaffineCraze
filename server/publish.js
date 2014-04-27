// Todos -- {text: String,
//           done: Boolean,
//           tags: [String, ...],
//           list_id: String,
//           timestamp: Number}

Stimulants = new Meteor.Collection("stimulants");

Meteor.publish('stimulants', function () {
  return Stimulants.find();
});