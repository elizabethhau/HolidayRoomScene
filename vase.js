/* Author: Emily Cetlin & Elizabeth Hau
 * Last modified: 12/18/2014
 *
 * This program creates a somewhat transparent vase using LatheGeometry and PlaneGeometry. 
 * The function takes in the color of the vase.
 */

function createVase(color){

    // the number of segments is specified to be 4 here to create a square base for the vase
    // we also want the entire vase (not half a vase) so phiStart is set to 0 and phiLength is 
    // set to 2*Math.PI
    var v = makeVase(4, 0, 2*Math.PI);

    /* This function is mainly borrowed from Dirksen's demo on LatheGeometry (generatePoints function).
     * This helper function first generates the points to be used to create the LatheGeometry (the body of the vase)
     * and adds a bottom (PlaneGeometry) to the body of the vase.
     */
   function makeVase(segments, phiStart, phiLength) {
            
            var vase = new THREE.Object3D();
            var points = [];
            var height = 5;
            var count = 30;
            for (var i = 0; i < count; i++) {
                points.push(new THREE.Vector3((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12, 0, ( i - count ) + count / 2));
            }
            console.log(points); 

            // geometry for the bottom
            var vbottomG = new THREE.PlaneGeometry((2*points[points.length-1].x)/Math.sqrt(2),(2*points[points.length-1].x)/Math.sqrt(2));
            console.log(2*points[points.length-1].x);
            var vbottomMat = new THREE.MeshPhongMaterial({
              color: color, 
              side: THREE.DoubleSide,
              transparent: true,
              opacity: 0.9
            } );
            var vbottom = new THREE.Mesh(vbottomG,vbottomMat);

            // rotate the bottom so that it is in the same orientation as the body of the base 
            vbottom.rotation.z =.25*Math.PI;
            vbottom.rotation.x = .5*Math.PI;
            vase.add(vbottom);

            // use the same points to create a convexgeometry
            var latheGeometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
            latheMesh = new THREE.Mesh(latheGeometry,vbottomMat);
            latheMesh.translateY(14);
            latheMesh.rotation.x=.5*Math.PI;
            vase.add(latheMesh);

            return vase;
        }

 
          return v;
}