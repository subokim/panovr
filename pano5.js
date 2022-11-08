var container, panorama, viewer, scene, camera;

// Get Google Map API Key - https://developers.google.com/maps/documentation/javascript/get-api-key
//panorama = new PANOLENS.GoogleStreetviewPanorama( 'JmSoPsBPhqWvaBmOqfFzgA', 0 );
//,'AIzaSyAP7psgb_3x6cGqMDSQETHk7qZ7fCBYy0I'

bar = document.querySelector( '#bar' );

function onProgressUpdate ( event ) {
  var percentage = event.progress.loaded/ event.progress.total * 100;
  bar.style.width = percentage + "%";
  if (percentage >= 100){
    bar.classList.add( 'hide' );
    setTimeout(function(){
      bar.style.width = 0;
    }, 1000);
  }
}

container = document.querySelector( '#container' );
//panorama = new PANOLENS.ImagePanorama( './asset/pano_vr3.jpg' );
panorama = new PANOLENS.GoogleStreetviewPanorama('EybxZg5Wo6LIbhreS6JBtQ');

viewer = new PANOLENS.Viewer( { container: container, cameraFov : 60 } );
viewer.add( panorama );

camera = viewer.getCamera();
scene = viewer.getScene();
renderer = viewer.getRenderer();

var gridHelper = new THREE.GridHelper( 20, 20, '#adff2f', '#ff7f50' );
scene.add( gridHelper );

//camera rotate, lookAt
let targetPos = getVectorFromAngle(180, 0, 2000)
viewer.tweenControlCenter(targetPos);

panorama.addEventListener( 'click', function(){
  //camera.getWorldDirection(v);
  //const h_angle = THREE.Math.radToDeg( Math.atan2(v.x,v.z) );
  //const v_angle = THREE.Math.radToDeg( Math.atan2(v.y,v.x) );
  //console.log("vector=", offset);
  //console.log("h_angle=", h_angle, ", v_angle=", v_angle);
});