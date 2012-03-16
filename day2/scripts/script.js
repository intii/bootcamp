//show an alert after page is loaded.
$(document).ready(function () {
    alert("Page succesfuly loaded");
});

//cursor inside textbox. 
$(document).ready(function () {
    document.getElementById("alias").focus();
});

//submit data from textbox to dispatcher.php when clicking button.
//take the response from dispatcher and paste it into the righttext div.
//text in righttext red when server error occurs.
//right after the response is set inside the div, it is highlighted.
//after all previous is done, it shows a loading animation
function submitText(){
    var text=$("#alias").val();
    var url="api/dispatcher.php";
    $.post(url, {service: 'welcome.hello', params: {name: text}},
            function(data){
                $("#righttext p").html(data,data);
            })
            .error(function() {$("#righttext p").css('color','red');})
            .complete(function(){
                $("#righttext p").css('background-color','green');
                $.mobile.showPageLoadingMsg();
            })
}
$("#btday1").click(function() {
  submitText();
});


var movies=null;//movies will contain the JSON object evaluated
var moviesActive= false;//bool value, indicates whether the movies function is active or not.
var index=0;//index will indicate which movie will be called.

$("#movieList").delegate("li","click",function (){
    var indexMovie=$(this).index();
    index= indexMovie;
});

function movieHandler(){
    var value= $("#slider").val();
    if (value == "off"){
        moviesActive=false;
    }else{
        getMovies();
    }
}
function getMovies(){
    if( movies == null ){// if movies!=null then the ajax req was already made
        $.ajax({
            url: "api/dispatcher.php",
            contentType: "application/json",
            data: {service: 'movie.getTop'},
            dataType: "json",
            success: function(data){
                var JSONobject=data;
                movies=JSONobject;
                for(var i=0; i < movies.length;i++){
                    var title= movies[i].ShortName;
                    var year= movies[i].ReleaseYear;
                    var thumb= movies[i].BoxArt.SmallUrl;
                    $("#movieList").append("<li data-index='"+i+"'><a href='dialogMovie.html' data-rel='dialog'><img src='"+thumb+"'/><h3>"+ title +"</h3><p>"+year+"</p></a></li>");
                }
                $("#movieList").listview('refresh');//refresh the style of the list after dynamic insertion
            }
        });
    }
    moviesActive=true;
}

function showMovies(){
    if( moviesActive == true ){
        var title= movies[index].ShortName;
        var year= movies[index].ReleaseYear;
        var syno= movies[index].ShortSynopsis;
        var img= movies[index].BoxArt.LargeUrl;
        var all= title + "</br>" + year + "</br>" + syno;
        $("#image").html("<img src='"+img+"'/>");
        $("#desc").html(all);
    }else{
        $("#desc").html("First activate the movie function");
    }   
}


//finish the loading animation when ESC key is pressed
$(document).keyup(function(e) {
    if (e.keyCode == 27) { 
        $.mobile.hidePageLoadingMsg(); 
    }   
})

