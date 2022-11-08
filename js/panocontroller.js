function getVectorFromAngle(ha, va, radius) {
    //make unit vector(x,y,z)
    let offset = new THREE.Vector3();
    let theta = THREE.Math.degToRad(ha); //horizontal
    let phi = THREE.Math.degToRad(va); //vertical
  
    let vz = new THREE.Vector3(0,0,1); // start point
    let vx = new THREE.Vector3(Math.tan(theta),0,0);
    let vs = Math.sqrt( Math.tan(theta) * Math.tan(theta) + 1); //slop length by x and z;
    let vy = new THREE.Vector3(0, Math.tan(phi) * vs ,0);
  
    offset.add(vz); //start point
    offset.add(vx); // add horizontal angle
    offset.add(vy); // add vertical angle
    offset.normalize();
  
    //multiply radius to unit vector
    offset.x = radius * Math.cos(phi) * Math.sin(theta);
    offset.y = radius * Math.sin(phi);
    offset.z = radius * Math.cos(phi) * Math.cos(theta);
  
    return offset;
}

//Rotate the panoram by angle (horizontal_angle, vertical_angle)
//pano : panorama object (SphereGeometry)
//horizontal : positive = right (0~360)
//vertical : positive = up (-180 ~ 180)
function panoRotate(pano, horizontal_angle, vertical_angle) {
  pano.rotation.y = (-(Math.PI * horizontal_angle)/180); //horizontal
  pano.rotation.x = (-(Math.PI * vertical_angle)/180); //vertical
}

function setInfospot(ha, va, radius, linkPanorama) {
    let targetPos = getVectorFromAngle(ha, va, radius);
  
    // rotate offset back
    infospot = new PANOLENS.Infospot( 8, PANOLENS.DataImage.Info );
  
    infospot.position.x = targetPos.x;
    infospot.position.y = targetPos.y;
    infospot.position.z = targetPos.z;  

    infospot.addHoverText( "Enter" );
    infospot.addEventListener('click', function(){
      viewer.setPanorama( linkPanorama );
    });
  
    return infospot;
  }