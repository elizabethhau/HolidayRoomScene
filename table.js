/*
	Copyright 2014 Francys Scott and Susie Carovillano
	
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
	fscottTable.js
	November 2014
	Francys Scott and Susie Carovillano

	Creates a table upon which objects can rest.  Rectangular with four legs.  
	One function just takes height, width, and color, and the other also takes the names of
	texture jpgs to map to the object.  The textured table also has lathed legs
	for aesthetics.

	Helper methods for these functions include building the geometries 
	for both tables and both types of legs, simple cylinder and lathe.
*/


/** 
	createTable(height, width, tableColor, tableShininess)
	createTable builds a simple table with the user's color of choice.
	End result will look like a simple children's plastic table.
	Frame:  The table has its origin point in the center of the table top, on its surface
			(half the width, half the length, on the surface of the table top). 
	Size:  The table is longer than it is wide, with a height and width
			specified by the user.  Thickness of the table legs and tabletop thickness
			is proportional to the given dimensions.
			In the end, its dimensions are 
			(width)x(height)x(width * 1.4).  
	Color:  Color and shininess are given by the user.  
*/

/* This function is modified by Emily Cetlin & Elizabeth Hau
 * This function now takes in the height, width, and length of the desired table along with its 
 * color and shininess.
 */
function createTable(height, width, length, tableColor, tableShininess)  {
	// material for all parts of table
	var tableM = new THREE.MeshPhongMaterial({color: tableColor,
    										 ambient: tableColor,
                                             shininess: tableShininess
                                    		});

	// vars needed for dimensions of the table

	var topThick = height * 0.05;			// thickness of tabletop
	var legDiam = width * 0.05;				// thickness of leg
	var legHeight = height * 0.95;  	// from floor to underside of tabletop
	
    // Create table top first
    var tableGeom = createTableTopGeom(height, width, length, topThick);
    var tableframe = new THREE.Object3D();	// frame in which table is placed
    var tabletop = new THREE.Mesh(tableGeom, tableM);
    tableframe.add(tabletop);
    tabletop.position.y=-topThick/2;
    
    
    // Create table legs and attach to table
    var legGeom = createStraightLegsGeom(legDiam, legHeight);
    var leg1 = new THREE.Mesh(legGeom, tableM);
    var leg2 = leg1.clone();
    var leg3 = leg1.clone();
    var leg4 = leg1.clone();
    // position legs appropriately relative to the tabletop.
    leg1.position.set((width/2 - legDiam),-(legHeight/2),(length/2 - legDiam));
    leg2.position.set(-(width/2 - legDiam),-(legHeight/2),-(length/2 - legDiam));
    leg3.position.set(-(width/2 - legDiam),-(legHeight/2),(length/2 - legDiam));
    leg4.position.set((width/2 - legDiam),-(legHeight/2),-(length/2 - legDiam));
    tableframe.add(leg1);
    tableframe.add(leg2);
    tableframe.add(leg3);
	tableframe.add(leg4);
	
	
	return table;
}

/** 
	createTexturedTable(height, width, tableTexture, tableShininess)
	Frame:  The table has its origin point in the center of the table top 
			(half the width, half the length, on the surface of the table top). 
	Size:  The table is longer than it is wide, with a height and width
			specified by the user, from which the length  
			is calculated.  Thickness of the table legs and tabletop thickness
			is proportional to the given dimensions.In the end, its dimensions are 
			(width)x(height)x(width * 1.4).  
	Color:  There's no color, but there are textures and shininess given by the user.  
*/

/* This function is also modified so that it takes in the height, width, and length of 
 * the table along with the texture and desired shininess of the table.
 */
function createTexturedTable(height, width, length, tableTexture, tableShininess)  {
	// Create texture from string name given
	var wood = THREE.ImageUtils.loadTexture( tableTexture ,
                                                new THREE.UVMapping(),
                                                TW.render );
	wood.wrapS = THREE.RepeatWrapping;
	wood.wrapT = THREE.RepeatWrapping;
	wood.repeat.set( 1, 1 );
	// Create material using given texture and shininess
	var tableM = new THREE.MeshPhongMaterial({map: wood,
                                             shininess: tableShininess
                                    		});

	// vars needed for dimensions of the table
	var topThick = height * 0.05;			// thickness of tabletop
	var legDiam = width * 0.05;				// thickness of leg
	var legHeight = height;  	// from floor to underside of tabletop
	
    // Create table top first
    var tableGeom = createTableTopGeom(height, width, length, topThick);
    var tableframe = new THREE.Object3D();
    var tabletop = new THREE.Mesh(tableGeom, tableM);
    tableframe.add(tabletop);
    tabletop.position.y=-topThick/2;
    
    // Create table legs and attach to table
    var legGeom = createLatheLegsGeom(legDiam, legHeight); //createStraightLegsGeom(legDiam, legHeight);
    var leg1 = new THREE.Mesh(legGeom, tableM);
    leg1.rotateX(Math.PI/2);	// rotate upright
	// clone one leg since the others are identical; no need to create extra work.
    var leg2 = leg1.clone();
    var leg3 = leg1.clone();
    var leg4 = leg1.clone();
    // position legs appropriately relative to the tabletop.
    leg1.position.set((width/2 - legDiam),0,(length/2 - legDiam));
    leg2.position.set(-(width/2 - legDiam),0,-(length/2 - legDiam));
    leg3.position.set(-(width/2 - legDiam),0,(length/2 - legDiam));
    leg4.position.set((width/2 - legDiam),0,-(length/2 - legDiam));
    tableframe.add(leg1);
    tableframe.add(leg2);
    tableframe.add(leg3);
	tableframe.add(leg4);
	
	return tableframe;
}


/* Simple geometry to build top part of table.
*/
function createTableTopGeom (height, width, length, topThick)  {
	var tabletop = new THREE.BoxGeometry(width, 			// width 
											topThick,		// height  of top
											length);		// length or top   

	return tabletop;
}

/* 	Simple geometry to build solid cylinder leg for table.
*/
function createStraightLegsGeom (legDiam, legHeight)  {
	var tableLeg = new THREE.CylinderGeometry(legDiam,legDiam,legHeight, 20);
	return tableLeg;
}


/* simple lathe object creates table legs for the table.  Parameters are based on
	given table parameters so the legs always scale with the table.
*/
function createLatheLegsGeom(legDiam, legHeight)  {

	var points = [ [0, 0, 0],    //silhouette of legs for table
					[1, 0, 0],
					[0.6, 0, 0.1],
				   	[0.8, 0, 0.2],
                   	[0.5, 0, .4],
                   	[0.75, 0, .5],
                   	[0.85, 0, .6],
                   	[0.75, 0, .7],
                   	[0.55, 0, .8],
                   	[1, 0, 1],
                   	[0, 0, 1] ];  // closes off the bottom of the lathe
                   	
    var alt = [];
    var size = legHeight;
    for( var i=0; i<points.length; i++ ) { // Puts points in Vector3 form to use in lathe
        var p = new THREE.Vector3();
        p.x = legDiam * points[i][0];	// scale width of leg to match diameter param
        p.z = size * points[i][2];		// scale length of leg to match height param
        p.y = points[i][1];;
        alt.push(p);
    }
    
    var geom = new THREE.LatheGeometry( alt, 16 ); 
    // 16 segments make it look like an generally rounded table leg without using 
    // too much processor resources.
    
	return geom;
}
