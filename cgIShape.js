//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//

const ONE = 1;
const HALF = 0.5;
function makeCube (subdivisions)  {
    if( subdivisions < ONE )
    subdivisions = ONE;
    step = ONE /  subdivisions;
    for (i = 0; i < subdivisions; i++) {
        u_0 = i * step - HALF;
        u_1 = (i + ONE) * step - HALF;
        for ( j = 0; j < subdivisions; j++) {
            v_0 = j * step - HALF;
            v_1 = (j + ONE) * step - HALF;
            addTriangle(u_0, v_0, HALF, u_1, v_0, HALF, u_0, v_1, HALF);
            addTriangle(u_0, v_1, HALF, u_1, v_0, HALF, u_1, v_1, HALF);
            addTriangle(u_1, v_0, -HALF, u_0, v_0, -HALF, u_0, v_1, -HALF);
            addTriangle(u_1, v_0, -HALF, u_0, v_1, -HALF, u_1, v_1, -HALF);
            addTriangle(HALF, u_1, v_0, HALF, u_0, v_1, HALF, u_0, v_0);
            addTriangle(HALF, u_1, v_0, HALF, u_1, v_1, HALF, u_0, v_1);
            addTriangle(u_1, -HALF, v_0, u_0, -HALF, v_1, u_0, -HALF, v_0);
            addTriangle(u_1, -HALF, v_0, u_1, -HALF, v_1, u_0, -HALF, v_1);
            addTriangle(u_0, HALF, v_1, u_1, HALF, v_0, u_0, HALF, v_0);
            addTriangle(u_1, HALF, v_1, u_1, HALF, v_0, u_0, HALF, v_1);
            addTriangle(-HALF, u_0, v_1, -HALF, u_1, v_0, -HALF, u_0, v_0);
            addTriangle(-HALF, u_1, v_1, -HALF, u_1, v_0, -HALF, u_0, v_1);
        }
    }
}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision){
    if( heightdivision < 1 )
        heightdivision = 1;
    height_steps = 1 /  heightdivision;
    if( radialdivision < 3 )
        radialdivision = 3;
    angle = 0
    for (i = 0; i < radialdivision; i++){
    	u0 = 0.5 * Math.cos((angle * Math.PI) / 180.0)
    	v0 = 0.5 * Math.sin((angle * Math.PI) / 180.0)
    	angle = angle + 360 / radialdivision
    	u1 = 0.5 * Math.cos((angle * Math.PI) / 180.0)
    	v1 = 0.5 * Math.sin((angle * Math.PI) / 180.0)
    	addTriangle (0, 0.5, 0, u1, 0.5, v1, u0, 0.5, v0);
    	addTriangle (0, -0.5, 0, u1, -0.5, v1, u0, -0.5, v0);
    	
    	for( j = 0; j < heightdivision; j++){
    		h0 = j * height_steps - .5;
		 	h1 = (j + 1) * height_steps - .5;
    		addTriangle(u0, h0, v0, u1, h0, v1, u1, h1, v1);
			addTriangle(u1, h1, v1, u0, h1, v0, u0, h0, v0);
    	}
    }

}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {
    // fill in your code here.
}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

