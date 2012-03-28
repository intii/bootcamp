/*
/	MOVIE MODEL -----------
*/
var Movie = Backbone.Model.extend({
	defaults: function(){
		return {
			title: "No name Movie",
			year: "No year defined.",
			synopsis: "No synopsis defined.",
			cast: "No cast defined."
		};
	},

	initialize: function(){
		if( !this.get("title") ){
			this.set({"title": this.defaults.title});
		}
	},

	clear: function(){
		this.destroy();
	}
});
/*
/	MOVIE COLLECTION -----------
*/

var MovieList = Backbone.Collection.extend({

	model: Movie,

})

var movies= new MovieList;

/*
/	MOVIE VIEW -----------
*/
MovieView = Backbone.View.extend({

	
	tagName: "li",

	events:{
		'click .delbtt': 'remove',
		'click .edbtt' : 'edit',
		'click .detbtt': 'addDetails',
		'keypress #editMovie': 'editOnEnter'
	},

	initialize: function(){
		this.model.bind('change', this.render,this);
		_.bindAll(this,'render','remove','unrender','edit','editOnEnter','addDetails');
		this.model.bind('remove',this.unrender,this);
		$("list").listview();
	},

	render: function(){
		var Dbutton= "<span><input type='button' value='Delete' class='delbtt' data-role='button'></input></span>";
		var Ebutton= "<span><input type='button' value='Edit' class='edbtt'></input></span>";
		var Detbutton= "<span><input type='button' value='Details' class='detbtt'></input></span>";
		var newTitle= this.model.get("title");
		this.$el.html(newTitle+ Dbutton + Ebutton+ Detbutton);
		$("list").listview('refresh');
		return this;
	},

	 unrender: function(){
     	$(this.el).remove();
    },

	remove: function(){
      	this.model.destroy();
    },	
    edit: function(){
    	this.$el.html("<input type='text' id='editMovie'></input>");
    	$("#editMovie").focus();
    },
    editOnEnter: function(e){
    	if (e.keyCode != 13) return; // if key pressed is not Enter.
      	if (!$("#editMovie").val()) return; // if there's no value in the input field.
      	var newValue=$("#editMovie").val();
      	this.model.set({ title: newValue });
    },
    addDetails: function(){
    	var _title=this.model.get("title");
    	var year=this.model.get("year");
    	var syno=this.model.get("synopsis");
    	var cast=this.model.get("cast");
    	var details="<h3>"+_title+"</h3><p>"+year+"</p><p>"+syno+"</p><p>"+cast+"</p>";
    	$("#detailDiv").html(details);
    }
});
/*
/	APPLICATION VIEW -- Controls the interaction with the user.
*/
AppView = Backbone.View.extend({

	events: {
      "keypress #movieIn":  "createOnEnter"
  	},

	initialize: function(){
		movies.bind('add',this.addOne);
		this.collection=movies;
	},
	createOnEnter: function(e){
		if (e.keyCode != 13) return; // if key pressed is not Enter.
      	if (!$("#movieIn").val()) return; // if there's no value in the input field.
      	var mov= new Movie;
      	mov.set({ title: $("#movieIn").val() });
      	this.collection.add(mov); //adding to the collections triggers addOne function.
      	$("#movieIn").val('');
    },
    addOne: function(mov){
    	var view= new MovieView({model: mov});
    	$("#list").append(view.render().el);
    }

});

var app = new AppView({ el : $("#inputDiv")});