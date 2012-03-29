var Actor= (function(){
	var Actor=function(_name,_age){
		this.name= _name;
		this.age=_age;
		this.biography="No biography";

		this.getName= function(){
			return this.name;
		},
		this.getAge= function(){
			return this.age;
		},
		this.setAge= function(_age){
			this.age=_age;
		},
		this.setBiography= function(_bio){
			this.biography=_bio;
		},
		this.getBiography= function(){
			return this.biography;
		}
	};
	return function(_name,_age){
		return new Actor(_name,_age);
	};
})();