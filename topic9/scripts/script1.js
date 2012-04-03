$(function(){

	/*
	/--	 COMPATIBILITY MODERNIZER YEPNOPE
	*/
	//GEOLOCATOIN
	yepnope({
		test: Modernizr.geolocation,
		nope: 'js/polyfiller.js'
	})
	//FILE READER
	yepnope({
		test: Modernizr.draganddrop && window.FileReader,
		nope: 'js/dropfile.js'
	})

	//WEB WORKERS
	yepnope({
		test: Modernizr.webworkers,
		nope: 'js/fakeworker-0.1.js'
	})
	//WEB SOCKETS
	WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf";
	yepnope({
		test: Modernizr.websockets,
		nope: ['js/swfobject.js','js/web_socket.js']
	})

	//MEDIA QUERIES	
		yepnope({
		test: Modernizr.mq(),
		nope: 'js/css3-mediaqueries.js'
	})

	var area = document.getElementById('area');
	$("#area").bind('click',function(){
		$("#area").val("");
	});

	//executes the javascript code in #area
	$("#callButton").bind('click',function(){
		var value= area.value;
		eval(value);
	});
	/*
	/ To persist the inserted text in the browser's storage
	*/
	if( !area.value ){
		if( !window.localStorage.getItem('value') ){
			area.value("Insert your code here...");
		}else{
			var pastText=window.localStorage.getItem('value');
			area.val(pastText);
		}
	};

	area.addEventListener('keyup',function(){
	window.localStorage.setItem('value', area.value);
  	window.localStorage.setItem('timestamp', (new Date()).getTime());
	}, false);

	/*
	/ DRAG AND DROP FILES
	*/
	  function handleFileSelect(evt) {
	    evt.stopPropagation();
	    evt.preventDefault();

	    var files = evt.dataTransfer.files; // FileList object.

	    // files is a FileList of File objects. List some properties.
	    var output = [];
	    for (var i = 0, f; f = files[i]; i++) {
	      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
	                  f.size, ' bytes, last modified: ',
	                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
	                  '</li>');
    }
	    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	  }

	function handleDragOver(evt) {
	   	evt.stopPropagation();
	    evt.preventDefault();
	    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	}

	  // Setup the dnd listeners.
	var dropZone = document.getElementById('dropDiv');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);

	/*
	/ GEOLOCATION
	*/
	
	var initialLocation;
	var mdq = new google.maps.LatLng(-38, -57.55);
	var map;
	var infowindow = new google.maps.InfoWindow();
	var mapOptions = {
	  zoom: 13,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(showPosition, onError);
	  // also monitor position as it changes
	  //navigator.geolocation.watchPosition(showPosition);
	} else {
	  onError();
	}

	function showPosition(position) {
	  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	  
	  var lat = position.coords.latitude;
	  var lng = position.coords.longitude;
	  initialLocation = new google.maps.LatLng(lat, lng);
	  map.setCenter(initialLocation);
	  infowindow.setContent("You are here:<br/>lat: "+lat + "<br/>" +"lng: " +lng);
	  infowindow.setPosition(initialLocation);
	  infowindow.open(map);
	}
	function onError() {
		if (navigator.geolocation) {
		    initialLocation = mdq;
		    contentString = "Error: The Geolocation service failed.";
	  	} else {
		    initialLocation = mdq;
		    contentString = "Error: Your browser doesn't support geolocation.";
	  	}
	  	mapOptions.zoom = 4;
	  	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	  	map.setCenter(initialLocation);
	  	infowindow.setContent(contentString);
	  	infowindow.setPosition(initialLocation);
	  	infowindow.open(map);
	  }
	/*
	/	WORKERS JOB
	*/

	var worker= new Worker("scripts/work.js");
	worker.onmessage = function (event) { 
		$("#workerJob").html(event.data); 
	};
	
	/*
	/ WEB SOCKET
	*/
	if ("WebSocket" in window) {
  	var ws = new WebSocket("ws://echo.websocket.org");
  	ws.onopen = function() {
    // Web Socket is connected. You can send data by send() method.
    ws.send("echo received through web socket"); 
  	};
  	ws.onmessage = function (evt) { 
  		var received_msg = evt.data; 
  		$("#wsMsg").html(received_msg);
  	};
  	ws.onclose = function() {}; 
  	}

});	
