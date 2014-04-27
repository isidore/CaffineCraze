// Client-side JavaScript, bundled and sent to client.

// Define Minimongo collections to match server/publish.js.
Stimulants = new Meteor.Collection("stimulants");

var getCaffeineLevel =  function(time, consumed){
  var caffeine = 0;

  // for each item, add the caffeine and subtract the loss
  for(var i in consumed){
    var c = consumed[i];
    console.log("c", c);
    var timeToBody = time - c.time;
    //console.log("time", time, c.time, timeToBody, c);
    if (timeToBody < 3){
      var lossPerHour = c.item.caffeine/3;  
      caffeine += c.item.caffeine;  
      caffeine -= timeToBody*lossPerHour;
    }
    else{
      //no effect
    }
    

  }
  console.log("caffine level:", caffeine);
  return caffeine;
};

var isStillAwake =  function(time, consumed){
  return (100 < getCaffeineLevel(time, consumed));
};



Template.Menu.menuItems =  function(){
  var hoursToStayAwake = 2;
  var currentHour = 0;
  var consumed = [];
  var coffee = {name:"coffee", caffeine:95};
  // until we're at the end of our sleep
  // figure out the amount of coffee to stay awake for the next hour
  var totalCount = 0;
  while (currentHour < hoursToStayAwake && totalCount < 5){
    if (!isStillAwake(currentHour+1, consumed)){
      consumed.push({time:currentHour, item:coffee});
    }
    else {
      currentHour++;
    }
    totalCount++;
  }
  console.log(consumed);
  return consumed;
};






////////// Todos //////////

Template.Preferences.stimulants = function () {
  // Determine which stimulants to display in main pane,
  // selected based on list_id and tag_filter.

  return Stimulants.find();
};

// Subscribe to 'lists' collection on startup.
// Select a list once data has arrived.
var listsHandle = Meteor.subscribe('stimulants', function () {
});


////////// Tracking selected list in URL //////////
/*
var TodosRouter = Backbone.Router.extend({
  routes: {
    ":list_id": "main"
  },
  main: function (list_id) {
    var oldList = Session.get("list_id");
    if (oldList !== list_id) {
      Session.set("list_id", list_id);
      Session.set("tag_filter", null);
    }
  },
  setList: function (list_id) {
    this.navigate(list_id, true);
  }
});

Router = new TodosRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});*/
