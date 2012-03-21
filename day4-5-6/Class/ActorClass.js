var Actor= function(_name){
	var name=_name;
	var age;
	var biography;
	return {
		getName: function(){
			return name;
		},
		getAge: function(){
			return age;
		},
		setAge: function(_age){
			age=_age;
		},
		setBiograpyh: function(_bio){
			biography=_bio;
		},
		getBiography: function(){
			return biography;
		}
	};
}();