/* myscript.js for Assignment 3 */

var flist = new Array();
var newForecast;
var rowid;
var myName;

function Forecast(fcode, fdate, fday, fhigh, flow, ftext) {
	this.fcode = fcode;
	this.fdate = fdate;
	this.fday = fday;
	this.fhigh = fhigh
	this.flow = flow;
	this.ftext = ftext;
}
	
$(document).on("pagebeforeshow", "#jsonOut", function() {

	// Start of getJSON
	$.getJSON("a3_torontoWeather.json", function (data) {

		// Create variables to store myData from json
		start = data.query.myData;
		start2 = data.query.results.channel;

		
		// Save my name to a variables
		myName = start.studName;

		// Change header
		$("h1").html(start.studName + "<br>" + start2.lastBuildDate );
	
		// Create array for forecast
		start3 = data.query.results.channel.item.forecast;		

		for (x=0; x < start3.length; x++) {
			newForecast = new Forecast(
				start3[x].code,
				start3[x].date, 
				start3[x].day, 
				start3[x].high, 
				start3[x].low, 
				start3[x].text
			);
			flist.push(newForecast);
			console.log(flist);
		}				

		loadMain();
	});  // End of getJSON
});

$(document).on("pagebeforeshow", "#forecastCollapse", function() {
	$.getJSON("a3_torontoWeather.json", function (data) {
		start = data.query.myData;
		start2 = data.query.results.channel;
	// Change header
	$("h1").html(start.studName + "<br>" + start2.lastBuildDate );
	});  // End of forecastCollapse
});		

$(document).on("pagebeforeshow", "#dataEntry", function() {
	$.getJSON("a3_torontoWeather.json", function (data) {
		start = data.query.myData;
		start2 = data.query.results.channel;
	// Change header
	$("h1").html(start.studName + "<br>" + start2.lastBuildDate );
	});  // End of getJSON
});		

$(document).on("pagebeforeshow", "#about", function() {
	$.getJSON("a3_torontoWeather.json", function (data) {
		start = data.query.myData;
		start2 = data.query.results.channel;
	// Change header
	$("h1").html(start.studName + "<br>" + start2.lastBuildDate );
	});  // End of getJSON
});		

function loadMain() {
	//Clear output areas before appending to it
	$("#mainTable").html("");
	$("#windTable").html("");
	$("#atmosphereTable").html("");
	$("#astronomyTable").html("");
	
	// load #maintable
	$("#mainTable").append(
	"<tr><th>City</th><th>Country</th><th>Region</th><th>Lat</th><th>Long</th></tr>" + 
	"<tr><td>" + start2.location.city + "</td>" + 
	"<td>" + start2.location.country + "</td>" + 
	"<td>" + start2.location.region + "</td>" + 
	"<td>" + start2.item.lat + "</td>" + 
	"<td>" + start2.item.long + "</td>" + 
	"<td>" + "<img src=" + start.weatherImg + "></td>" + 
	"</tr>"
	);
	
	// load #windTable
	$("#windTable").append(
		"<tr>" +
			"<td>Chill: " +  start2.wind.chill + "</td></tr><tr>" +
			"<td>Direction: " + start2.wind.direction + "</td></tr><tr>" +
			"<td>Speed: " + start2.wind.speed + "</td>" +
		"</tr>"
	);
	
	// load #atmosphereTable
	$("#atmosphereTable").append(
		"<tr>" +
			"<td>Humidity: " + start2.atmosphere.humidity + "</td></tr><tr>" +
			"<td>Pressure: " + start2.atmosphere.pressure + "</td></tr><tr>" +
			"<td>Rising: " + start2.atmosphere.rising + "</td></tr><tr>" +
			"<td>Visibility: " + start2.atmosphere.visibility + "</td>" +
		"</tr>"
	);
	
	// load #astronomyTable
	$("#astronomyTable").append(
		"<tr>" +
			"<td>Sunrise: " + start2.astronomy.sunrise + "</td></tr><tr>" +
			"<td>Sunset: " + start2.astronomy.sunset + "</td>" +
		"</tr>"
	);
		console.log("test");
		
	// collapsible set
	for (x=0; x < flist.length; x++) {
		$("#forecastList").append(
			"<section data-role='collapsible'>" + 
			"<h3 class = 'ui-btn'>" +
				"<span class='n" + x + "'>" + flist[x].fdate + "</span>" +  					
				"</h3>" +
				"<p>" +
					"<table>" +
						"<tr>" +	
							"<th>CODE: </th>" + 
								"<td>" + flist[x].fcode + "</td>" +
							"</th>" +
						"</tr>" +
						"<tr>" +	
							"<th>DAY: </th>" + 
								"<td>" + flist[x].fday + "</td>" +
							"</th>" +
						"</tr>" +	
						"<tr>" +	
							"<th>HIGH: </th>" + 
								"<td>" + flist[x].fhigh + "</td>" +
							"</th>" +
						"</tr>" +
						"<tr>" +	
							"<th>LOW: </th>" + 
								"<td>" + flist[x].flow + "</td>" +
							"</th>" +
						"</tr>" +		
						"<tr>" +	
							"<th>TEXT: </th>" + 
								"<td>" + flist[x].ftext + "</td>" +
							"</th>" +
						"</tr>" +									
					"</table>" +
				"</p>"+
			"</section>"
		); // end of append for collapsible set	
	}	
	
	// load #about
	$("#aboutMe").append(
		"<tr>" +
			"<td>Name: " +  start.studName + "</td></tr>" +
			"<tr><td>ID: " + start.studNumb + "</td></tr>" +
			"<tr><td>Program: " + start.studProg + "</td></tr>" +
			"<tr><td>Quote: " + start.myQuote + "</td></tr>" +
			"<tr><td><img src=" + start.myPic + "></td>" +
		"</tr>"
	);

} // End of loadMain

$(document).on("pageshow", "#dataEntry", function() {
	$("#submit").click(function() {
		localStorage.setItem("ls_Email", $("input[name='lemail']").val() );
		localStorage.setItem("ls_City", $("input[name='lcity']:selected").attr("value") );
		localStorage.setItem("ls_Comments", $("input[name='lcomments']").val() );
		alert("Thank you, " + start.studName + " your comments have been saved");
	});
});

$(document).on("pageshow", "#localStorage", function() {
	console.log(localStorage.getItem("ls_Comments"));
	$("#comOut").val(localStorage.getItem("ls_Comments"));
});
