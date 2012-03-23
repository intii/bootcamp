/*
*  Use jSmart Template Engine
*/
$("#JSmart").bind('click',(function(){
	var tmpl= 	"<div style='background-color: grey'>\
				<h1>{$name}</h1>\
				<h2>{$descr}</h2>\
				<h3>{$country} | {$spec}</h3>\
				<p>{$educ}</p>\
				{foreach $workexp as $i => $work}\
				<li>{$work}</li>\
				{/foreach}\
				</div>";
	var jsmart= new jSmart(tmpl);
	var result= jsmart.fetch(profile);
	$("#cont").html(result);
}));
/*
*  Use Mustache Template Engine
*/
$("#mustache").bind('click',(function(){
	var tmpl= 	"<div style='background-color: grey'>\
				<h1>{{name}}</h1>\
				<h2>{{descr}}</h2>\
				<h3>{{country}} | {{spec}}</h3>\
				<p>{{educ}}</p>\
				<p> Work Experience </p>\
				{{#workexp}}\
				<li>{{_}}</li>\ 
				{{/workexp}}\
				</div>";
	var result=Mustache.render(tmpl,profile);			
	$("#cont").html(result);
}));

/*
*  Use Underscore Template Engine
*/
$("#underscore").bind('click',(function(){
	var tmpl= 	"<div style='background-color: grey'>\
				<h1><%= name %></h1>\
				<h2><%= descr %></h2>\
				<h3><%= country %> | <%= spec %></h3>\
				<p><%= educ %></p>\
				<p> Work Experience </p>\
				<% _.each(workexp,function(job){%>\
				<li> <%= job %> </li><%})%>\
				</div>";
	var result= _.template(tmpl,profile);			
	$("#cont").html(result);
}));

$("#clear").bind('click',function(){$("#cont").html("");})



		
