Handlebars.registerHelper('arrayify',function(obj){
  result = [];
  for (var key in obj) {
    result.push({'key':key,'value':obj[key]});
  };
  return result;
});

// helper for district
Handlebars.registerHelper('transDistr',function(val){
  var allDistr = Config.getDistrict();
  return allDistr[val];
});

// helper for MRT
Handlebars.registerHelper('transMRT',function(val){
  var allMRTs = Config.getMRT()
    , line = val.substr(0, 2);
  return allMRTs[line]['stations'][val];
});

// helper for property type
Handlebars.registerHelper('transPtype',function(val){
  var allTypes = Config.getPropertyTypes();
  return allTypes[val];
});

// helper for property facilities
Handlebars.registerHelper('transPfaci',function(val){
  var allFaci = Config.getFacilities();
  return allFaci[val];
});

// helper for move in date
Handlebars.registerHelper('transDatetime',function(val){
  return moment(val, "YYYY-MM-DD");
});

