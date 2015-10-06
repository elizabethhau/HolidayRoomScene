// ================== TAKEN FROM HOMEWORK 5 ====================================

    function isPowerOf2(x) {
        // Clever way to check if an integer is a power of two. If it's not a
        // positive integer; you're out of luck, so check for that before
        // using this. For our application (image dimensions), it works fine.
        // when we subtract 1 from an power of two, we get something that
        // shares no bits with it, so the bitwise and is false.  If it's not a
        // power of two, the borrow doesn't affect the larger power of two, so
        // the bitwise and is true.  See
        // http://www.exploringbinary.com/ten-ways-to-check-if-an-integer-is-a-power-of-two-in-c/
        return ((x != 0) && !(x & (x-1)));
    }

    var numTexturesToLoad = 0;
    function textureMaterial(url) {
        // Function to load an image from a URL, check its dimensions (must be
        // a power of two in order for "repeat" to work), create a texture and
        // return it.
        numTexturesToLoad ++;
        var texture = new THREE.ImageUtils.loadTexture(
            url,
            new THREE.UVMapping(),
            function (text) {
                console.log("loaded: "+url);
                if(!isPowerOf2(text.image.width) ||
                    !isPowerOf2(text.image.height)) {
                    throw "Image dimensions are not powers of two: "+url
                        +": "+text.image.width+"x"+text.image.height;
                }
                numTexturesToLoad --;
                if( numTexturesToLoad == 0 )
                    TW.render();
            });
        texture.wrapS = THREE.MirroredRepeatWrapping;
        texture.wrapT = THREE.MirroredRepeatWrapping;
            //texture.repeat;
        texture.needsUpdate = true;
        var mat = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            map: texture,
            shininess: 5});
                
                     
        mat.name = "texture from: "+url;
        console.log(mat.name);
        return mat;
    }