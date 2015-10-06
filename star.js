/* Author: Emily Cetlin & Elizabeth Hau
 * Last modified: 12/12/2014
 *
 * This program creates a star
 */

/* This function creates a star by drawing the star shape first and then extruding it.
 * The function takes in two parameters: the width and depth of the star.
 */
function createStar(w, d){
    var star = new THREE.Shape();
    star.moveTo(  0, 0, 0);
    
    star.lineTo( (1/4)*w, -(1/3)*w, 0); // bottom left
    star.lineTo( (1/6)*w, (1/9)*w, 0); 
    star.lineTo( (1/2)*w, (1/3)*w, 0); // middle left
    star.lineTo( (1/8)*w, (1/3)*w, 0); 
    star.lineTo(  0, (2/3)*w, 0); // top
    star.lineTo(-(1/8)*w, (1/3)*w, 0);
    star.lineTo(-(1/2)*w, (1/3)*w, 0); // middle right
    star.lineTo(-(1/6)*w, (1/9)*w, 0);
    star.lineTo(-(1/4)*w, -(1/3)*w, 0); // bottom right
    star.lineTo(  0, 0, 0);

    var starGeom = new THREE.ShapeGeometry(star);
    var starMesh = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0xFFFF00), // yellow
      side: THREE.DoubleSide,
      emissive: new THREE.Color(0xFFFF00) // emissive property turned on --> yellow
    });
    
    var options = {
      amount: d, // thickness of the star
      bevelThickness: 0.1,
      bevelSize: 0.1
    };
    
    var starExtrude = new THREE.ExtrudeGeometry(star, options);
    var starFinal = new THREE.Mesh(starExtrude, starMesh);
    return starFinal;
  }