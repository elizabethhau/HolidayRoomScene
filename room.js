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
    
	fscottRoom.js
	Francys Scott and Susie Carovillano
	November 2014
	
	Simple function to create a room based on size (height), color and shininess.
	Note that the ambient color is default set to the surface color.
	
*/
function createRoom(height, wallTexture, ceilingTexture, floorTexture)  {

	var w2 = height / 2;		// one-half the room height 
           
    //BoxGeometry instead
    //Creating the environment --> the room
	var roomGeometry = new THREE.BoxGeometry(height*1.5, // width 150
											height ,			// height 100
											height*1.5);	// length 150
											
	// Create floor and wall textures for the room.
	var wallpaper = THREE.ImageUtils.loadTexture( wallTexture ,
                                                new THREE.UVMapping(),
                                                TW.render );
	wallpaper.wrapS = THREE.RepeatWrapping;
	wallpaper.wrapT = THREE.RepeatWrapping;
	wallpaper.repeat.set( 1, 1 );
	
	var stuccoCeiling = THREE.ImageUtils.loadTexture( ceilingTexture , 
                                                new THREE.UVMapping(),
                                                TW.render );
	wallpaper.wrapS = THREE.RepeatWrapping;
	wallpaper.wrapT = THREE.RepeatWrapping;
	wallpaper.repeat.set( 1, 1 );
	
	var woodFloor = THREE.ImageUtils.loadTexture( floorTexture ,  
                                                new THREE.UVMapping(),
                                                TW.render );
	woodFloor.wrapS = THREE.RepeatWrapping;
	woodFloor.wrapT = THREE.RepeatWrapping;
	woodFloor.repeat.set( 1, 1 );
	
        
	var materialArray = [];
	// [+X, -X, +Y, -Y, -Z, +Z]
	// [right, left, ceiling, floor, back, front]
	//var faceColors = [0xDDDDDD, 0xDDDDDD, 0xFFFFF0, 0xDDDDDD, 0xDDDDDD, 0xDDDDDD, 0xDDDDDD ];

	for(var i = 0; i < 6; i++) {
    	materialArray.push(new THREE.MeshPhongMaterial({
     	map: wallpaper,
        side: THREE.BackSide}));  // face only on the inside
	}
	
	materialArray[2].map = stuccoCeiling;
	materialArray[3].map = woodFloor;
	
	var roomMaterial = new THREE.MeshFaceMaterial(materialArray);
	var room = new THREE.Mesh(roomGeometry, roomMaterial);
	
	return room;
}
