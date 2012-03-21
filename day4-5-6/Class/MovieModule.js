var Movie= function(){
	
	var title="NN";
    var rating=0;
    var id=0;
    var cast=[];


	return {

		getTitle: function(){
        return title;
	    },
	    setTitle: function(tt){
	        title=tt;
	    },
	    getRating: function(){
	        return rating;
	    },
	    setRating: function(rt){
	        rating=rt;
	    },
	    getId: function(){
	        return id;
	    },
	    setId: function(i){
	        id=i;
	    },
	    play: function(){
	        MovieObserver.publish("play",this);
	    },
	    stop: function(){
	        MovieObserver.publish("stop",this);
	    },
	    setCast: function(_cast){
	    	len= _cast.length;
	    	for(var i=0; i < len; i++){
	    		cast.push(_cast[i]);	
	    	}
	    },
	    getCast: function(){
	    	return cast;
	    }

	}
}();
Movie.prototype={
	like: function(){},
	share: function(){ alert("not changed!")}
};



function augment( receivingClass, givingClass){
    for( var methodName in givingClass.prototype ){
        if( !receivingClass.prototype[methodName] ){
            receivingClass.prototype[methodName]= givingClass.prototype[methodName];
        }
    };
};