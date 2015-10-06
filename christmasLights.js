/* Author: Emily Cetlin & Elizabeth Hau
 * Last modified: 12/19/2014
 *
 * This program adds three rungs of decorative lights to a tree
 */


/* This function creates an Object3D for the lights by calling createDecorativeLights that will add lights to 
 * the object. We call createDecorative lights three times to create lights for the three segments (third) of 
 * the tree.
 */
function addTreeLights(){
  var lights = new THREE.Object3D();
  lights.name = "lights";
  createDecorativeLights(lights,treeProperties.topWidthA,treeProperties.topWidthB,treeHeight,3); // top third
  createDecorativeLights(lights,treeProperties.midWidthA,treeProperties.midWidthB,treeHeight,2);
  createDecorativeLights(lights,treeProperties.botWidthA,treeProperties.botWidthB,treeHeight,1); // bottom third
  return lights;
}

      /* This helper function creates lights for one segment (third) of the tree and adds it to the "lights" Object3D.
       * This function takes in the lights, the topWidth, bottomWidth, height of 
       * the third of the tree, and the third of the tree. 
       * The parameter "lights" is an Object3D that will contain all the lights that will be added to the tree.
       * The parameter "third" tells us which third of the tree we are adding the lights to, with 3 being the top third, 
       * 2 being the middle third, and 1 being the bottom third.
       */
      function createDecorativeLights(lights, topWidth, bottomWidth, height, third){
        var radius; // radius of the ring of lights
        
        for(var index = 1; index <= 3; index++){
        // the number of lights we would like to add to the tree depending on which ring and which third we are looking at
        var numLights = (12-(2*index));
          if(third == 1)
            numLights = numLights*3;
          else if(third == 2)
            numLights = numLights*2;


        // a for loop that adds the number of lights to a ring as indicated above
        for(var i = 0; i < numLights; i++){
          var theta = i*(2*Math.PI/numLights);
          radius = bottomWidth - (index/4)*(bottomWidth-topWidth);
          var light = createOneLight(i);
          light.translateY((third)*height/4+(index*height/16));
          light.translateX(radius * Math.cos(theta));
          light.translateZ(radius * Math.sin(theta));
          lightArray.push(light); // push it onto the lightArray that is later used in project.html when animating the lights
          lights.add(light);
        }
      }
      }

      /* This function creates one light using a sphere geometry and setting the emissive property of the sphere so that the
       * light glows. 
       */
      function createOneLight(id){
        var color = 0xFFFF00; // yellow
        var lightGeom = new THREE.SphereGeometry((treeHeight+treeWidth)/200, 8, 6);
        var lightMat = new THREE.MeshPhongMaterial({
          emissive: color,
          id: id});

      var lightMesh = new THREE.Mesh(lightGeom,lightMat);
        return lightMesh;
      }
