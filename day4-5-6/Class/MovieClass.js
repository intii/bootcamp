function Movie(){
    ///////////PRIVATE///////////////
    var title="NN";
    var rating=0;
    var id=0;
    ///////////PUBLIC////////////////
    this.getTitle=function(){
        return title;
    }
    this.setTitle=function(tt){
        title=tt;
    }
    this.getRating=function(){
        return rating;
    }
    this.setRating=function(rt){
        rating=rt;
    }
    this.getId=function(){
        return id;
    }
    this.setId=function(i){
        id=i;
    }
    this.play=function(obs){
        obs.publish("play",this);
    };
    this.stop=function(obs){
        obs.publish("stop",this);
    };
    
}

