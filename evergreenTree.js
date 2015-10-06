/* Author: Emily Cetlin & Elizabeth Hau
 * Last modified: 12/17/2014
 *
 * This program creates a texture mapped Evergreen tree that has three segments to it.
 */


/* This function takes in the desired height, width, and textures of the evergreen tree as parameters and
 * invokes several helper function that puts together different parts of the evergreen tree. 
 * Each part of the evergreen tree is put into an object 3D and the function 
 * returns the entire evergreen tree with textured material.
 */
function evergreenTree(height, width, treeTexture, barkTexture) {
  var tree = new THREE.Object3D();

// ================================================================
// create each component of the tree

  var top = createThird(0, width/4, height/4, treeTexture, 1); // top
  var middle = createThird(width/6, width/3, height/4, treeTexture, 2); // middle
  var bottom = createThird(width/4, width/2, height/4, treeTexture, 3); // bottom 

  var baseGeom = new THREE.CylinderGeometry(width/8, width/8, height/4, 10);
  var base = new THREE.Mesh(baseGeom, barkTexture);



      /* This function creates one third (layer) of the tree.
       * The function takes in the topWidth, bottomWidth, height, texture of the 
       * desired third of the tree, and the index represents which third we are looking
       * at: 1 being the top, 2 being the middle, 3 being the bottom.
       */
      function createThird(topWidth, bottomWidth, height, texture, index){
        var thirdGeom = new THREE.CylinderGeometry(topWidth, bottomWidth, height, 10);
        var third = new THREE.Mesh(thirdGeom, texture);
        
        return third;
      }


  // translate the various parts of the tree 
  top.translateY(7*height/8);
  middle.translateY(5*height/8);
  bottom.translateY(3*height/8)
  base.translateY(height/8);

  // add the components of the tree to the tree object
  tree.add(top);
  tree.add(middle);
  tree.add(bottom);
  tree.add(base);

return tree;


}