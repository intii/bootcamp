require(['DirectorModule', 'MovieModule','jquery','jquery.mobile','domReady'], function(DirectorModule, MovieModule,domReady) {
	domReady(function(){
		var movie = new MovieModule;
		movie.setTitle("Historias Minimas");
		var director= new DirectorModule("Carlos Sorin");
		director.setQuotes(["La vida es asi","Asi esta la cosa","El envido esta primero"]);
		movie.setDirector(director);
		movie.getDirector().speak();
	});	
});