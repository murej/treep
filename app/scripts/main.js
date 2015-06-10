/*! mousestop - v3.0.1 - 2013-07-15 */!function(a){function b(){var b=this,c=a(this).data("mousestop");this.movement=!0,c.timeToStop&&(this.timeToStopTimer=window.setTimeout(function(){b.movement=!1,window.clearTimeout(b.timer)},c.timeToStop))}function c(){window.clearTimeout(this.timer),window.clearTimeout(this.timeToStopTimer)}function d(){var b=a(this),c=b.data("mousestop");this.movement&&(window.clearTimeout(this.timer),this.timer=window.setTimeout(function(){b.trigger("mousestop")},c.delay))}function e(b){return a.isNumeric(b)?b={delay:b}:"object"!=typeof b&&(b={}),a.extend({},a.fn.mousestop.defaults,b)}a.event.special.mousestop={setup:function(f){a(this).data("mousestop",e(f)).bind("mouseenter.mousestop",b).bind("mouseleave.mousestop",c).bind("mousemove.mousestop",d)},teardown:function(){a(this).removeData("mousestop").unbind(".mousestop")}},a.fn.mousestop=function(a,b){return"function"==typeof a&&(b=a),arguments.length>0?this.bind("mousestop",a,b):this.trigger("mousestop")},a.fn.mousestop.defaults={delay:300,timeToStop:null}}(jQuery);

function uploadMedia(filename, blob) {

  $.ajax({
    type:'POST',
    url: 'https://api-content.dropbox.com/1/files_put/auto/' + filename,
    headers: { 'Authorization': 'Bearer XVeOb0MKbDwAAAAAAAAKNlnrMfkSqFFq_bK8hOfOQOI8aM58i0HI4QfcjRwK8crJ', 'Content-Type': 'image/png'},
    dataType: 'html',
    processData: false,
    data: blob,
    success: function(data) {
      window.saveAs(blob, "treep.png");
    },
    error: function(jqXHR, textStatus, errorThrown ) {
      window.saveAs(blob, "treep.png");
      console.log("Error when uploading file: " + textStatus + " because:" + errorThrown);
    }
  });
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var paper;
var triangleAmount;
var width = $(window).width();
var height = $(window).height();

function generate()
{

	triangleAmount = getRandom(10,70);
	var redFlag = getRandom(0,triangleAmount);
	var background;

	if( getRandom(0,6) ) { background = "rgba(0,0,0)"; }
	else { background = "rgba(255,255,255)"; }

	// Creates canvas width × height at 0, 0
	paper = new Raphael(0, 0, width, height);

	paper.rect(0,0, width, height).attr({

			fill: background,
			stroke: "none"

	});

	for(var i=0; i <= triangleAmount; i++) {

		var triangle;
		var startX;
		var startY;
		var pointX;
		var pointY;
		var endX;
		var endY;

		// from top
		if ( i % 4 === 0 ) {

			startX = getRandom(0,width/2);
			startY = 0;

			pointX = getRandom(0,width);
			pointY = height;

			endX = getRandom(width/2,width);
			endY = 0;

		}
		// from right
		else if ( i % 3 === 0 ) {

			startX = width;
			startY = getRandom(0,height/2);

			pointX = 0;
			pointY = getRandom(0,height);

			endX = width;
			endY = getRandom(height/2,height);

		}
		// from bottom
		else if ( i % 2 === 0 ) {

			startX = getRandom(0,width/2);
			startY = height;

			pointX = getRandom(0,width);
			pointY = 0;

			endX = getRandom(width/2,width);
			endY = height;

		}
		// from left
		else if( i % 1 === 0) {

			startX = 0;
			startY = getRandom(0,height/2);

			pointX = width;
			pointY = getRandom(0,height);

			endX = 0;
			endY = getRandom(height/2,height);

		}


		// choose color
/* 		var rgb = "59,163,247"; */
		var rgb = "0,0,0";
		var opacity = getRandomArbitrary(0.01,0.10);

		if(i === redFlag) {
			rgb = "232,87,46";
			opacity = getRandom(0.6,0.9);
		}

		triangle = paper.path("M"+startX+","+startY+"L"+pointX+","+pointY+"L"+endX+","+endY).attr({

			fill: "rgba("+rgb+","+opacity+")",
			stroke: "none"

		});
	}
}


var colorToggle = false;
var opacityToggle = false;
var backgroundToggle = false;

function toggle(parameter) {

	switch(parameter) {

		case "color":

			if(colorToggle) { colorToggle = false; }
			else { colorToggle = true; }

			$("li#color").toggleClass("selected");
			break;

		case "opacity":

			if(opacityToggle) {opacityToggle = false; }
			else { opacityToggle = true; }

			$("li#opacity").toggleClass("selected");
			break;

		case "background":
			if(backgroundToggle) {backgroundToggle = false; }
			else { backgroundToggle = true; }

			$("li#background").toggleClass("selected");
			break;
	}
}

var color;
var prevColor = rgbToHex(232,87,46);
var changeCheck = true;

function change(num)
{

	if( changeCheck === true ) {

		//changeCheck = false;

		if(typeof num === 'undefined') {
			num = 1;
		}

		for(var i=0; i < num; i++) {

			// select path
			var selector = $("path[fill="+prevColor+"]").next("path");

			if ( selector.length === 0 ) {
				selector = $("path").first();
			}

			// set color
			if ( colorToggle === false ) {
				var mono = getRandom(0, 255);
				color = rgbToHex( mono, mono, mono );
			}
			else {
				color = rgbToHex( getRandom(0, 255), getRandom(0, 255), getRandom(0, 255) );
			}

			// change opacity
			if( opacityToggle ) {
				selector.attr("fill-opacity", getRandomArbitrary(0.005,0.2));
			}

			// change background
			if( backgroundToggle ) {
				$("rect").attr("fill", color);
			}

			// change fill
			selector.attr("fill",color);

			prevColor = color;
		}
	}
}

function generateLink(coordX, coordY) {

	$("div#saved").remove();

	// resize for export
	paper.setViewBox(0, 0, width, height );
	paper.canvas.setAttribute('preserveAspectRatio', 'none');
	$('svg').attr('width', 1440).attr('height', 900);

	// create canvas
	$("body").append('<canvas id="placeholder"></canvas>');
	var canvas = $("canvas#placeholder");

	// draw from svg
	canvg("placeholder", $("<svg />").append( $("svg").clone() ).html() );

  // generate image data uri
  var blob;
  canvas[0].toBlob(function(b) {
    blob = b;
  });

	// create and position button
	$("body").append('<div id="saved"><span>&#8677;</span></div>');

	$("div#saved").css({
		left: coordX-($("div#saved").width()/2),
		top: coordY-($("div#saved").height()/2)
	}).hide().fadeIn(100);

	// remove canvas
	canvas.remove();

	// revert to window size
	$('svg').attr('width', width).attr('height', height);

  return blob;
}

$(document).ready(function() {

	var coordX = 0;
	var coordY = 0;

	var prevX = 0;
	var prevY = 0;

	var locked;
	var lockedSelected;

	var fill;
	var opacity;

	var partyTime;

	generate();

	$(document).mousemove( function(e) {


		coordX = e.pageX;
		coordY = e.pageY;

		if( prevX !== e.pageX && prevY !== e.pageY ) {

			$("body").css("cursor","none");
			$("div#saved").remove();

			change();

			//clearInterval(partyTime);
			//changeMusic();

			prevX = e.pageX;
			prevY = e.pageY;
		}
	});

	document.ontouchmove = function(event) {
		event.preventDefault();
		change();
	};


	$(document).on("mousestop", function() {

		generateLink(coordX, coordY);
	});

	$(document).keypress(function(e) {

		e.preventDefault();

		if(!locked) {

			// if "a" or "A" pressed
			if( e.which === 97 || e.which === 65 ) {
				toggle("color");
			}

			// if "s" or S" pressed
			else if( e.which === 115 || e.which === 83 ) {
				toggle("opacity");
			}

			// if "d" or "D" pressed
			else if( e.which === 100 || e.which === 68 ) {
				toggle("background");
			}
			// if "Space bar" pressed
			else if( e.which === 32 ) {
				paper.remove();
				generate();
				change(triangleAmount);
				$("li#randomise").addClass("selected");
				if(!locked) { generateLink(coordX,coordY); }
			}
		}

	});

	$(document).keyup(function(e) {

		// if "Space bar" pressed
		if( e.which === 32 ) {
			$("li#randomise").removeClass("selected");
		}
	});

	$("ul li").click(function() {

		if( $(this).attr("id") === "color" ) {
			toggle("color");
		}
		else if( $(this).attr("id") === "opacity" ) {
			toggle("opacity");
		}
		else if( $(this).attr("id") === "background" ) {
			toggle("background");
		}
		else if( $(this).attr("id") === "randomise" ) {
			paper.remove();
			generate();
			change(triangleAmount);
			$("li#randomise").addClass("selected");
			$("li#randomise").removeClass("selected");

		}
	});

	$("svg").children().hover(
		function() {

			if(locked) {
				lockedSelected = $(this);

				fill = lockedSelected.attr("fill");
				opacity = lockedSelected.attr("fill-opacity");

				lockedSelected.attr("fill","#E8572E");
				lockedSelected.attr("fill-opacity","0.75");
			}
		},
		function() {
			if(locked) {
				lockedSelected.attr("fill",fill);
				lockedSelected.attr("fill-opacity",opacity);
			}
		}
	);

	$("body").delegate("div#saved span", "click", function() {

    var filename = Date.now() + ".png";
    var blob = generateLink();

    $("div#saved span").remove();
    uploadMedia(filename, blob);
	});
});
