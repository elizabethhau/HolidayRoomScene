/* Author: Emily Cetlin & Elizabeth Hau
 * Last modified: 12/18/2014
 *
 * This program creates simple couch using box geometries and cylinders. The function takes in four parameters: width, height,
 * and depth of the couch, along with material. The couch will always contain two cushions.
 */


function createCouch(width, height, depth, couchMaterial){
  var couch = new THREE.Object3D();

  // creating the bottom of the couch
  var bottomGeom = new THREE.BoxGeometry(6*width/8, height/4, 7*depth/8);
  var bottom = new THREE.Mesh(bottomGeom, couchMaterial);
  bottom.translateY(height/8);
  couch.add(bottom);

  //creating the left arm of the couch by first creating the base and then adding the cushion on top
  var leftGeom = new THREE.BoxGeometry(width/8, 3*height/4, depth);
  var left = new THREE.Mesh(leftGeom, couchMaterial);
  left.translateY(3*height/8);
  left.translateX(-3*width/8 - width/16);
  couch.add(left);

  var leftArmGeom = new THREE.CylinderGeometry(height/8, height/8, depth, 16);
  var leftArm = new THREE.Mesh(leftArmGeom, couchMaterial);
  leftArm.rotation.x = 0.5*Math.PI;
  leftArm.position.set(-width/2 + height/16, 3*height/4 - height/16, 0);
  couch.add(leftArm);

  // creating the right arm of the couch by first creating the base and then adding the cushion on top
  var rightGeom = new THREE.BoxGeometry(width/8, 3*height/4, depth);
  var right = new THREE.Mesh(rightGeom, couchMaterial);
  right.translateY(3*height/8);
  right.translateX(3*width/8 + width/16);
  couch.add(right);

  var rightArmGeom = new THREE.CylinderGeometry(height/8, height/8, depth, 16);
  var rightArm = new THREE.Mesh(rightArmGeom, couchMaterial);
  rightArm.rotation.x = 0.5*Math.PI;
  rightArm.position.set(width/2 - height/16, 3*height/4 - height/16, 0);
  couch.add(rightArm);

  // creating the back of the couch
  var backGeom = new THREE.BoxGeometry(width, height, depth/8);
  var back = new THREE.Mesh(backGeom, couchMaterial);
  back.translateY(height/2);
  back.translateZ(-7*depth/16);
  couch.add(back);

  // creating the left couch cushion
  var cushionGeomL = new THREE.BoxGeometry(3*width/8 - 1, height/5, 2*depth/3);
  var cushionL = new THREE.Mesh(cushionGeomL, couchMaterial);
  cushionL.position.set(-3*width/16, height/4+height/10,1);
  couch.add(cushionL);
  var cushGeomL = new THREE.CylinderGeometry(height/10, height/10, 3*width/8 -1, 16);
  var cushL = new THREE.Mesh(cushGeomL, couchMaterial);
  cushL.rotation.z = 0.5*Math.PI;
  cushL.position.set(-3*width/16, height/4+height/10, depth/3+1);
  couch.add(cushL);

  //creating the right couch cushion
  var cushionGeomR = new THREE.BoxGeometry(3*width/8 - 1, height/5, 2*depth/3);
  var cushionR = new THREE.Mesh(cushionGeomR, couchMaterial);
  cushionR.position.set(3*width/16, height/4+height/10,1);
  couch.add(cushionR);
  var cushGeomR = new THREE.CylinderGeometry(height/10, height/10, 3*width/8 -1, 16);
  var cushR = new THREE.Mesh(cushGeomR, couchMaterial);
  cushR.rotation.z = 0.5*Math.PI;
  cushR.position.set(3*width/16, height/4+height/10, depth/3+1);
  couch.add(cushR);

  return couch;
}