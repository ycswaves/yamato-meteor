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
    t.$('span.help-block').remove(); //clear all error msg

    /*********************************************
        Retrieve form data
    *********************************************/
    var address = t.find('input[name="address"]').value
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
        }, [])

      , contactInfo = {
          name: t.find('input[name=contact-person]').value,
          phone: t.find('input[name=contact-number]').value,
          qq: t.find('input[name=contact-qq]').value,
          wechat: t.find('input[name=contact-wechat]').value,
          email: t.find('input[name=contact-email]').value
        };

    /*********************************************
        Map form data to schema
    *********************************************/
    var formObj = {
      address: address,
      author: 'anonymous',
      price: price,
      description: descr,
      district: district,
      propertyType: pType,
      hasAgentFee: hasAgentFee,
      moveInDate: moveInDate,
      bedroom: bedroom,
      area: area,
      bathroom: bathroom,
      mrt: nearestMRT,
      facilities: facilities,
      contact: contactInfo
    };

    /*********************************************
        Map div id to schema, so as to attach
        error message in correspondant form-group
    *********************************************/
    var formErrDivID = {
      "address": "#address-form-group",
      //author: "",
      "price": "#price-form-group",
      "description": "#descr-form-group",
      //"district": "district-form-group",
      //"propertyType": pType,
      //"hasAgentFee": hasAgentFee,
      "moveInDate": "#movein-form-group",
      "area": "#area-form-group",
      //bathroom: bathroom,
      //mrt: nearestMRT,
      //facilities: facilities
      "contact.name": "#contact-person-form-group",
      "contact.phone": "#contact-number-form-group"
        //qq: '#',
        //wechat: '#',
        //email: '#'
    };

    //console.log(formObj);
    imgTemp.forEach(function(file){
      var id = Images.insert(file);
      console.log(id);
    });

    Properties.insert(formObj, function(err, res) {
      if(err){
        console.log(err);
        var targetDiv = formErrDivID[err.invalidKeys[0].name];
        console.log(targetDiv);
        t.$(targetDiv).append('<span style="color: red" class="help-block"><i class="fa fa-exclamation-triangle"></i> '+err.message+'</span>');
        t.$(targetDiv).find('input').focus();
      }

      console.log(res);
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