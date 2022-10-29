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
    makeT(subdivisions,step);
}
function makeT(subdivisions,step){
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
function makeCylinder (radialdivision, heightdivision){
    var radius = ONE;
    if( radialdivision < 3 )
        radialdivision = 3;
    if( heightdivision < ONE )
        heightdivision = ONE;
    makeCylinderT(heightdivision,radialdivision,radius);
}

function makeCylinderT(heightdivision,radialdivision,radius){
    var PI = Math.PI;
    var y0 = -ONE; var y1;
    var x0; var z0; var x1; var z1;
    for (var i = 0; i < radialdivision; i++) {
        x0 = radius * Math.cos(i * 2 * PI / radialdivision);
        z0 = radius * Math.sin(i * 2 * PI / radialdivision);
        x1 = radius * Math.cos((i+1) * 2 * PI / radialdivision);
        z1 = radius * Math.sin((i+1) * 2 * PI / radialdivision);
        addTriangle(0, -ONE, 0, x0, -ONE, z0, x1, -ONE, z1);
        addTriangle(x1, HALF, z1, x0, HALF, z0, 0, HALF, 0);
        for (var j = 0; j < heightdivision; j++) {
            y0 = (j) / heightdivision - HALF;
            y1 = (j + 1) / heightdivision -HALF;
            addTriangle(x0, y1, z0, x1, y1, z1, x0, y0, z0);
            addTriangle(x1, y1, z1, x1, y0, z1, x0, y0, z0);
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
    var radius = 0.5;
    if( radialdivision < 3 )
        radialdivision = 3;

    if( heightdivision < 1 )
        heightdivision = 1;
    makeConeT(heightdivision,radialdivision,radius)
    
}

function makeConeT(heightdivision,radialdivision,radius){
    const PI = Math.PI;

    for (var i = 0; i < radialdivision; i++) {
        var x0 = radius * Math.cos(i * 2 * PI / radialdivision);
        var z0 = radius * Math.sin(i * 2 * PI / radialdivision);
        var x1 = radius * Math.cos((i + 1) * 2 * PI / radialdivision);
        var z1 = radius * Math.sin((i + 1) * 2 * PI / radialdivision);
        addTriangle(x0, -0.5, z0, x1, -0.5, z1, 0.0, -0.5, 0.0);

        var y0 = -0.5;
        var cx0 = -x0 / heightdivision;
        var cz0 = -z0 / heightdivision;
        var cx1 = -x1 / heightdivision;
        var cz1 = -z1 / heightdivision;
        var y1 = 1.0 / heightdivision;
        for (var j = 0; j < heightdivision - 1; j++) {  
            addTriangle(x0, y0, z0, x0+cx0, y0+y1, z0+cz0, x1, y0, z1);
            addTriangle(x0+cx0, y0+y1, z0+cz0, x1+cx1, y0+y1, z1+cz1, x1, y0, z1);

            x0 += cx0;
            z0 += cz0;
            x1 += cx1;
            z1 += cz1;
            y0 += y1;
        }
        addTriangle(x0, y0, z0, 0.0, 0.5, 0.0, x1, y0, z1);
    }
}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
// recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
    var radius = 0.5;

    if (slices < 1)
        slices = 1;
    if (slices > 5)
        slices = 5;

    if (stacks < 3)
        stacks = 3;

    makeSphereT(slices,radius);

}

function makeSphereT(slices,radius){
    var a = radius;
    
    converseTri(0, a, -1, -a, 1, 0, a, 1, 0, slices, radius);
    converseTri(0, a, 1, a, 1, 0, -a, 1, 0, slices, radius);
    converseTri(0, a, 1, -1, 0, a, 0, -a, 1, slices, radius);
    converseTri(0, a, 1, 0, -a, 1, 1, 0, a, slices, radius);
    converseTri(0, a, -1, 1, 0, -a, 0, -a, -1, slices, radius);
    converseTri(0, a, -1, 0, -a, -1, -1, 0, -a, slices, radius);
    converseTri(0, -a, 1, -a, -1, 0, a, -1, 0, slices, radius);
    converseTri(0, -a, -1, a, -1, 0, -a, -1, 0, slices, radius);
    converseTri(-a, 1, 0, -1, 0, -a, -1, 0, a, slices, radius);
    converseTri(-a, -1, 0, -1, 0, a, -1, 0, -a, slices, radius);
    converseTri(a, 1, 0, 1, 0, a, 1, 0, -a, slices, radius);
    converseTri(a, -1, 0, 1, 0, -a, 1, 0, a, slices, radius);
    converseTri(0, a, 1, -a, 1, 0, -1, 0, a, slices, radius);
    converseTri(0, a, 1, 1, 0, a, a, 1, 0, slices, radius);
    converseTri(0, a, -1, -1, 0, -a, -a, 1, 0, slices, radius);
    converseTri(0, a, -1, a, 1, 0, 1, 0, -a, slices, radius);
    converseTri(0, -a, -1, -a, -1, 0, -1, 0, -a, slices, radius);
    converseTri(0, -a, -1, 1, 0, -a, a, -1, 0, slices, radius);
    converseTri(0, -a, 1, -1, 0, a, -a, -1, 0, slices, radius);
    converseTri(0, -a, 1, a, -1, 0, 1, 0, a, slices, radius);
}


function converseTri(x0, y0, z0, x1, y1, z1, x2, y2, z2, subdivision, radius)
{
    if (subdivision == 1)
    {
        
        var norm0 = Math.pow((Math.pow(x0, 2) + Math.pow(y0, 2) + Math.pow(z0, 2)), 0.5);
        x0 = (x0 / norm0) * radius;
        y0 = (y0 / norm0) * radius;
        z0 = (z0 / norm0) * radius;
        
        var norm1 = Math.pow((Math.pow(x1, 2) + Math.pow(y1, 2) + Math.pow(z1, 2)), 0.5);
        x1 = (x1 / norm1) * radius;
        y1 = (y1 / norm1) * radius;
        z1 = (z1 / norm1) * radius;
        
        var norm2 = Math.pow((Math.pow(x2, 2) + Math.pow(y2, 2) + Math.pow(z2, 2)), 0.5);
        x2 = (x2 / norm2) * radius;
        y2 = (y2 / norm2) * radius;
        z2 = (z2 / norm2) * radius;
        addTriangle(x0, y0, z0, x1, y1, z1, x2, y2, z2);
    }
    else
    {
        
        var midx01 = (x0 + x1) / 2.;
        var midy01 = (y0 + y1) / 2.;
        var midz01 = (z0 + z1) / 2.;

        var midx12 = (x1 + x2) / 2.;
        var midy12 = (y1 + y2) / 2.;
        var midz12 = (z1 + z2) / 2.;

        var midx20 = (x0 + x2) / 2.;
        var midy20 = (y0 + y2) / 2.;
        var midz20 = (z0 + z2) / 2.;

        converseTri(x0, y0, z0, midx01, midy01, midz01, midx20, midy20, midz20, (subdivision - 1), radius);
        converseTri(midx01, midy01, midz01, midx12, midy12, midz12, midx20, midy20, midz20, (subdivision - 1), radius);
        converseTri(midx01, midy01, midz01, x1, y1, z1, midx12, midy12, midz12, (subdivision - 1), radius);
        converseTri(midx20, midy20, midz20, midx12, midy12, midz12, x2, y2, z2, (subdivision - 1), radius);
    }
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

