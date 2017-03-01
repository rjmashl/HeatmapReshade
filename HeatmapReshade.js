/*
 * This file is part of Heatmap Reshade
 *
 * Copyright (c) 2017, Jay Mashl
 * Released under The MIT License
 */

function hexFromRGB(r, g, b) {
    var hex = [ r.toString( 16 ), g.toString( 16 ), b.toString( 16 ) ];
    $.each( hex, function( nr, val ) {
	if ( val.length == 1 ) {
	    hex[ nr ] = val + "0";
	}
    });
    return hex.join( "" ).toUpperCase();
}

function weighting(x, n) {
    var tol = 0.001;
    if( n > 1+tol ) {
	return Math.atan(n*x) / (Math.PI / 2);
    } else {
        return 0;
    }
}

function heatmapReshade( rowStart, rowEnd, colStart, colEnd, cellIDTag, dataTag, thresID, thresValDisp, enhanceID, enhanceValDisp ) {

    var thresVal = $( "#"+thresID ).slider( "value" ),
	enhanceVal = $( "#"+enhanceID ).slider( "value" );

    if( thresValDisp.length ) { $( "#"+thresValDisp ).val( thresVal ); }
    if( enhanceValDisp.length ) { $( "#"+enhanceValDisp ).val( enhanceVal ); }

    for(r = rowStart ; r <= rowEnd; r++ ) {
	for(c = colStart ; c <= colEnd; c++ ) {
	    myCoords = "_r"+r+"_c"+c;
	    cellVal = $("#"+cellIDTag+myCoords).data( dataTag );
	    if( cellVal < thresVal  ) {
		fr = (cellVal - thresVal) / ( 1 + thresVal) + 1;
		remapR = 255;
		remapG = parseInt( 255 * weighting( fr, enhanceVal ));
		remapB = remapG;
		$("#"+cellIDTag+myCoords).css( "background-color", "#" + hexFromRGB( remapR, remapG, remapB) );
            } else {
		fr = (cellVal - thresVal) / (-1 + thresVal)  + 1;
		remapR = parseInt( 255 * weighting( fr, enhanceVal ));
		remapG = 255;
		remapB = remapR;
		$("#"+cellIDTag+myCoords).css( "background-color", "#" + hexFromRGB( remapR, remapG, remapB) );
            }

	}
    }
}

// Generate matrix HTML
function createHTMLMatrix (numRows, numCols, tableID, cellIDTag, dataTag, valuesFunc) {
    var table="<table id='"+tableID+"'>";
    table += "<thead><tr>";

    table += "<th></th>";
    for(c =1 ; c <= numCols; c++ ) {
	table += "<th>Col"+c+"</th>";
    }
    table += "</tr></thead><tbody>";

    for(r=1 ; r <= numRows; r++ ) {
	table += "<tr><th>Row"+r+"</th>";
	for(c =1 ; c <= numCols; c++ ) {
            myCoords = "_r"+r+"_c"+c;
            rnd = valuesFunc();
            table += "<td id='"+cellIDTag+myCoords+"' data-"+dataTag+"='"+rnd+"'>"+rnd +"</td>";
	}
	table += "</tr>";
    }
    table += "</tbody></table>";
    return table;
}
