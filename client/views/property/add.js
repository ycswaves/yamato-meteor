var imgTemp = []; //to hold the to be uploaded images temporarily

Template.addProperty.rendered = function() {
    $('.datepicker').pickadate({
      format: 'yyyy/mm/dd'
    });
    $('.picker__holder').css('min-width', '274px');

    //Dropzone.autoDiscover = false;
    //dictResponseError = 'Error uploading file!';
    $("#upload").dropzone({
      addRemoveLinks : true,
      maxFilesize: 7,
      accept: function(file, done) {
          imgTemp.push(file);
          //Images.insert(file);
       }
    });

    render();
}

Template.addProperty.events({
  'change #mrtlines': function(e, t){
    e.preventDefault();
    var mrtLine = t.find('select[name="mrtlines"]').value;
    ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLine));
    Deps.flush();
    t.$('#stations').selectpicker('refresh');
  },

  'submit #propertyForm': function(e, t){
    e.preventDefault();

    /*********************************************
        Retrieve form data
    *********************************************/
    var title = t.find('input[name="title"]').value
      , price = t.find('input[name="price"]').value
      , descr = t.find('textarea[name="description"]').value
      , district = t.find('select[name="district"]').value
      // deal type
      , pType = t.find('select[name="property-type"]').value
      , hasAgentFee = t.find('input[name="has-agent-fee"]').value
      , moveInDate = t.find('input[name="move-in-date"]').value
      , bedroom = t.find('select[name="bedroom"]').value
      , area = t.find('input[name="property-area"]').value
      , bathroom = t.find('select[name="bathroom"]').value
      , nearestMRT = t.find('select[name="stations"]').value
      // photo gallerty
      , facilities = t.findAll('input:checkbox.property-facility').reduce(function (pre, current) {
          if(current.checked){
            pre.push(current.value);
          }
          return pre;
        }, []);

    /*********************************************
        Map form data to schema
    *********************************************/
    var formObj = {
      title: title,
      author: 'anonymous',
      price: price,
      description: descr,
      district: district,
      propertyType: pType,
      hasAgentFee: hasAgentFee,
      moveInDate: moveInDate,
      area: area,
      bathroom: bathroom,
      mrt: nearestMRT,
      facilities: facilities
    };

    console.log(formObj);
    imgTemp.forEach(function(file){
      var id = Images.insert(file);
      console.log(id);
    });
  }
});



Template.addProperty.helpers({
  district: function(){
    return Config.getDistrict();
  },

  mrtlines: function(){
    ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
    return Config.getMRT();
  },

  stations: function(){
    return ReactiveDS.get('mrtline');
  },

  facilities: function(){
    return Config.getFacilities();
  },

  ptypes: function(){
    return Config.getPropertyTypes();
  }
});