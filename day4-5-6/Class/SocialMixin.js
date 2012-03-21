var SocialMixin= function(){}
SocialMixin.prototype={
		like: function(){
			console.log("You like this");
		},
		share: function(friend){
			console.log("Sharing "+this.getTitle()+" with "+friend+".");
		}	
};