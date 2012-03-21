var MovieObserver= function(){
	var topics= {};
	return{
		publish: function( topic, args ){
			if(!topics[topic]){
				return false;
			}else{
				var subscribers= topics[topic];
				var lengthSubs=subscribers ? subscribers.length : 0;
				for(var i=0; i<lengthSubs; i++){
					subscribers[i].func(args);
				}
			}
			return true;
		},

		subscribe: function(topic,handler){
			if( !topics[topic]){
				topics[topic]=[];
			}
			topics[topic].push( handler );
			return true;
		}
	};	
}();