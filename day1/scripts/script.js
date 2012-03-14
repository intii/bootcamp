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
function submitText(){
    var text=$("#alias").val();
    var url="api/dispatcher.php";
    $.post(url, {service: 'welcome.hello', params: {name: text}},
            function(data){
                $("#righttext p").html(data);
            })
            .error(function() { $("#righttext p").css('color','red'); })
}


