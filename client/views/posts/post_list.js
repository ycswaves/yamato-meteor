var postsData = [ 
{
	title: 'Introducing Telescope',
	author: 'Sacha Greif',
	url: 'http://sachagreif.com/introducing-telescope/'
},
{
	title: 'Introducing Telescope',
	author: 'Sacha Greif',
	url: 'http://sachagreif.com/introducing-telescope/'
},
{
	title: 'Introducing Telescope',
	author: 'Sacha Greif',
	url: 'http://sachagreif.com/introducing-telescope/'
}
];
Template.postsList.helpers({ 
	posts: function() {
		return Posts.find(); 
	}
});

Template.postItem.helpers({ 
	domain: function() {
		var a = document.createElement('a'); 
		a.href = this.url;
		return a.hostname;
	} 
});