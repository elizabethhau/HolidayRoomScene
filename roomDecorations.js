/* Author: Emily Cetlin & Elizabeth Hau
 * Last modified: 12/18/2014
 *
 * This program creates various room decorations including a skirt for a Chirstmas tree, presents, and paintings.
 */


/* This function creates a skirt (an octagon) that can be used for the Christmas Tree. 
 * The size of the skirt can be specified by passing in the desired radius of the skirt.
 */
function createSkirt(radius){
  var skirtGeom = new THREE.CylinderGeometry(radius, radius, 2);
  var skirtMesh = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x8C0E0E), // red 
      side: THREE.DoubleSide
    });
  var skirt = new THREE.Mesh(skirtGeom, skirtMesh);
  skirt.translateY(1);
  return skirt;
}

/* This function creates a present by giving it a widht, height, depth, and texture.
 */
function createPresent(width, height, depth, texture){
  var present = new THREE.Object3D();
  var box = new THREE.BoxGeometry(width, height, depth);
  var mat = new THREE.Mesh(box, texture);
  mat.translateY(height/2);
  present.add(mat);
  return present;
}

/* This function adds a present to the scene by taking in the desired size of the present,
 * the texture of the present, and the desired postiion of the present.
 */
function addPresent(xsize,ysize,zsize,texture,xpos,ypos,zpos) {
   var p = createPresent(xsize,ysize,zsize,texture);
   p.position.set(xpos,ypos,zpos);
   scene.add(p);
}

/* This function allows users to add a painting to the scene by providing the dimensions of the painting
 * and the painting itself as a texture
 */
function addPainting(width,height,paintingTexture){
  var picture = new THREE.Object3D();

  var paintingGeom = new THREE.PlaneGeometry(width, height);
  
  // Create texture from string name given
  var painting= THREE.ImageUtils.loadTexture( paintingTexture ,
                                                new THREE.UVMapping(),
                                                TW.render );

  // Create material using given texture and shininess
  var paintingMat = new THREE.MeshPhongMaterial({
    map: painting,
    ambient: new THREE.Color(0xffffff), // white ambient light
    specular: 0xffffff // white specular light
  });
  var paintingMesh = new THREE.Mesh(paintingGeom, paintingMat);
  paintingMesh.translateZ(.01);
  picture.add(paintingMesh);

  return picture;
}