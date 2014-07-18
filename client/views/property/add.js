Template.addProperty.events({
  'change #mrtLines': function(e, t){
    e.preventDefault();
    console.log('onchange');
    Session.set('mrtLine', t.find('button[data-id="mrtLines"]').title);
    Template.addProperty.helpers.stations();
    return false;
  }
});


Template.addProperty.helpers({
  mrtLines: function(){
    var mrtList = Config.getMRT()
      , lines = [];
    //Session.set('mrtLine','EW');
    for (var line in mrtList){
      lines.push(line);
    }
    return lines;
  },

  stations: function(){
    return Config.getStationsByLine(Session.get('mrtLine'));
  }
});
