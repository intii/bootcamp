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
function submitText(){
    var text=$("#alias").val();
    var url="api/dispatcher.php";
    $.post(url, {service: 'welcome.hello', params: {name: text}},
            function(data){
                $("#righttext p").html(data);
            })
            .error(function() { $("#righttext p").css('color','red'); })
            .complete(function(){
                $("#righttext p").css('background-color','green');
            })
}

function getMovies(){
    $.ajax({
        url: "api/dispatcher.php",
        contentType: "application/json",
        data: {service: 'movie.getTop'},
        dataType: "json",
        success: function(data){
            var JSONobject= eval(data);
            for (var i = 0 ; i < 12; i++) {
                var t= setTimeout(showMovie(JSONobject,i),2500);
            };
        }
    });
}
function showMovie(JSONobject,i){
    var title= JSONobject[i].ShortName;
    var year= JSONobject[i].ReleaseYear;
    var syno= JSONobject[i].ShortSynopsis;
    var img= JSONobject[i].BoxArt.SmallUrl;
    var all= "<img src='"+img+"'/>"+title + "</br>" + year + "</br>" + syno;
    $("#middle").html(all);  
}


