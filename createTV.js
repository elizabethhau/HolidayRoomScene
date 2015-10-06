/* Author: Emily Cetlin & Elizabeth Hau
 * Last modified: 12/15/2014
 * 
 * This program creates a TV. 
 * The function creates a TV by taking in the width, height, and depth of the TV, 
 * so the function can create a flatscreen TV as well as an old-fashioned TV.
 * The function creates a TV by using a BoxGeometry for the frame of the TV and a
 * PlaneGeometry for the screen of the TV and combining them into an Object3D.
 */
function createTV(width, height, depth){
  var tv = new THREE.Object3D();
  var tvGeom = new THREE.BoxGeometry(width, height, depth);

  // MeshBasicMaterial so the frame always stays black
  var tvMat = new THREE.MeshBasicMaterial({
    color: 0x00000 // black frame
  });
  var tvMesh = new THREE.Mesh(tvGeom,tvMat);
  tv.add(tvMesh);

  var screenGeom = new THREE.PlaneGeometry(width*0.9,height*0.9);

  // MeshPhongMaterial so the screen reacts and reflects light when there is 
  // light shining on it
  var screenMat = new THREE.MeshPhongMaterial({
    color: 0x000000, // black screen
    specular:0xFFFFFF, // white specular highlight
  });
  var screenMesh = new THREE.Mesh(screenGeom,screenMat);
  screenMesh.translateZ(depth/2 + 0.1);
  tv.add(screenMesh);
  return tv;
}