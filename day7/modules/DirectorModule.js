define(function(){
	
	return function Director(_name){
		var name= _name;
		var quotes= [];

		this.getName=function(){
			return name;
		}

		this.setQuotes=function(_quotes){
			quotes=_quotes;
		}

		this.getQuotes=function(){
			return quotes;
		}	

		this.speak= function(){
			quote=quotes[Math.round((Math.random()*10)%quotes.length)];
			var box = $(document.createElement("div"));
			box.html(quote);
			box.dialog();
		}
	}
});