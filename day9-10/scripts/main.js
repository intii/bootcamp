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
		'click #submitEdit': 'editOnEnter'
	},

	initialize: function(){
		this.model.bind('change', this.render,this);
		_.bindAll(this,'render','remove','unrender','edit','editOnEnter','addDetails');
		this.model.bind('remove',this.unrender,this);
		$("#list").listview();
	},

	render: function(){
		var templ= "<%= title %>\
		<span><input type='button' value='Delete' class='delbtt' data-role='button'></input></span>\
		<span><input type='button' value='Edit' class='edbtt'></input></span>\
		<span><input type='button' value='Details' class='detbtt'></input></span>";
		var atts= this.model.toJSON();
		var result= _.template(templ,atts);
		this.$el.html(result);
		$("#list").listview('refresh');
		return this;
	},

	 unrender: function(){
     	$(this.el).remove();
    },

	remove: function(){
      	this.model.destroy();
    },	
    edit: function(){
    	this.$el.html("<input type='text' id='editMovie'></input>\
    					<input type='text' id='editMovie2'></input>\
    					<input type='text' id='editMovie3'></input>\
    					<input type='text' id='editMovie4'></input>\
    					<input type='button' id='submitEdit'value='Ok'></input>");
    	$("#editMovie").focus();
    },
    editOnEnter: function(){
      	if (!$("#editMovie").val()) return; // if there's no value in the input field.
      	var newTitle=$("#editMovie").val();
      	var newYear=$("#editMovie2").val();
      	var newSyno=$("#editMovie3").val();
      	var newCast=$("#editMovie4").val();
      	this.model.set({ title: newTitle });
      	this.model.set({ year: newYear });
      	this.model.set({ synopsis: newSyno });
      	this.model.set({ cast: newCast });
    },
    addDetails: function(){
    	var templ= "<h3> <%=title%> </h3>\
    				<p> <%=year%> </p>\
    				<p> <%=synopsis%> </p>\
    				<p> <%=cast%> </p>";
    	var atts= this.model.toJSON();
    	var det= _.template(templ,atts);
    	$("#detailDiv").html(det);
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
    	$("#list").listview('refresh');
    }

});

var app = new AppView({ el : $("#inputDiv")});