DownloadableMovie.prototype= Object.create(Movie);
DownloadableMovie.prototype.constructor= DownloadableMovie;

function DownloadableMovie(){
	
	this.download= function(downloader){
		downloader.down(this);
	}	
}