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
        //todo: process file
        imgTemp.push(file);
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
    var address = t.find('input[name="address"]').value || null
      , price = t.find('input[name="price"]').value || null
      , descr = t.find('textarea[name="description"]').value || null
      , district = t.find('select[name="district"]').value || null
      // deal type
      , pType = t.find('select[name="property-type"]').value || null
      , hasAgentFee = t.find('input:checked[name="has-agent-fee"]').value || null
      , moveInDate = t.find('input[name="move-in-date"]').value || null
      , bedroom = t.find('select[name="bedroom"]').value || null
      , area = t.find('input[name="property-area"]').value || null
      , bathroom = t.find('select[name="bathroom"]').value || null
      , nearestMRT = t.find('select[name="stations"]').value || null
      // photo gallerty
      , facilities = t.findAll('input:checkbox.property-facility').reduce(function (pre, current) {
          if(current.checked){
            pre.push(current.value);
          }
          return pre;
        }, [])
      , qq = t.find('input[name=contact-qq]').value  || null
      , contactInfo = {
          name: t.find('input[name=contact-person]').value || null,
          phone: t.find('input[name=contact-number]').value || null,
          qq: (qq != null)? parseInt(qq, 10) : null,
          wechat: t.find('input[name=contact-wechat]').value || null,
          email: t.find('input[name=contact-email]').value || null
        };

      var imageIDs = [];
      imgTemp.forEach(function(file){
        // Images.insert will return file object of inserted image
        var file = Images.insert(file);
        imageIDs.push(file._id); 
      });

    /*********************************************
        Map form data to schema
    *********************************************/
    var formObj = {
      address: address,
      author: Meteor.userId(),
      price: (price != null)? parseInt(price, 10) : null,
      description: descr,
      district: district,
      propertyType: pType,
      hasAgentFee: (hasAgentFee != null)? parseInt(hasAgentFee, 10) : null,
      moveInDate: (moveInDate != null)? new Date(moveInDate) : new Date(),
      bedroom: (bedroom != null)? parseInt(bedroom, 10) : null,
      area: (area != null)? parseInt(area, 10) : null,
      bathroom: (bathroom != null)? parseInt(bathroom, 10) : null,
      mrt: nearestMRT,
      contact: contactInfo,
      photos: imageIDs,
      facilities: facilities
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
    var context = Properties.simpleSchema().namedContext('propertyForm');
    context.validate(formObj);
    if(!context.isValid()){
      var isFocused = false;
      context.invalidKeys().forEach(function(e){
        var errMsg = context.keyErrorMessage(e.name)
          , targetDiv = formErrDivID[e.name];
        t.$(targetDiv).append('<span style="color: red" class="help-block"><i class="fa fa-exclamation-triangle"></i> '+errMsg+'</span>');
        if(!isFocused){
          t.$(targetDiv).find('input').focus();
        }
      });
    }
    else{
      Meteor.call('addProperty', formObj, function(err, id){
        if(err){
          return; //todo: show norification?
        }
        console.log('go to property/'+id)
      });
    }
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