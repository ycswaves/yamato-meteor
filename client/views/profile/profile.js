Template.profilePage.helpers({
  agency: function(){
  	return Config.getAgency();
  },
  loggedInUser: function(){
    return Meteor.user();
  },
  ifAgent:function(){
  	if(Meteor.user() && Meteor.user().profile.userType==1){
	  	return '';
	  }else{
	  	return 'checked';
	  }
  }
})

//Update action
Template.profilePage.events({
  'submit #accountProfile' : function(e, t) {
    e.preventDefault();
    if($('#agentCheck').is(':checked')){
    	var accountType = 2;
    }else{
    	var accountType = 1;
    }
    var agency = t.find('select[name=accountAgency]').value
      , name = t.find('input[name=name]').value
      , phone = t.find('input[name=phone]').value
      , qq = t.find('input[name=qq]').value
      , wechat = t.find('input[name=wechat]').value
      , about = t.find('textarea[name=about]').value;

    Meteor.users.update({_id:Meteor.userId()}, {$set:{
    	"profile.name":name,
    	"profile.phone":phone,
    	"profile.qq":qq,
    	"profile.wechat":wechat,
    	"profile.about":about
    }},function(err){
    	if (!err) {
      	NotificationMessages.sendSuccess('账户','用户资料更新成功');
      }
    });
    return false;
  }
})