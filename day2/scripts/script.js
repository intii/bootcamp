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
                $("#righttext p").html(data);
            })
            .error(function() { $("#righttext p").css('color','red'); })
            .complete(function(){
                $("#righttext p").css('background-color','green');
                $.mobile.showPageLoadingMsg();
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
            var title= JSONobject[0].ShortName;
            var year= JSONobject[0].ReleaseYear;
            var syno= JSONobject[0].ShortSynopsis;
            var img= JSONobject[0].BoxArt.SmallUrl;
            var all= "<img src='"+img+"'/>"+title + "</br>" + year + "</br>" + syno;
            $("#middle").html(all);
        }
    });
}

//finish the loading animation when ESC key is pressed
$(document).keyup(function(e) {
    if (e.keyCode == 27) { 
        $.mobile.hidePageLoadingMsg(); 
    }   
})
