var panorama, panorama2, viewer, container, scene, renderer;
var bar, infospot;

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

// set objects' positions
let infoPos1 = getVectorFromAngle(165, 1, 4000);
let infoPos2 = getVectorFromAngle(5, 0, 4000);
let lookPos1 = getVectorFromAngle(45, 0, 4000);
let lookPos2 = getVectorFromAngle(170, 0, 4000);

var infospotPositions = [infoPos1, infoPos2];
var lookAtPositions = [lookPos1, lookPos2];

container = document.querySelector( '#container' );

//panorama = new PANOLENS.GoogleStreetviewPanorama('8VRQVMxTcxwTvaa7T7jktA');
panorama = new PANOLENS.ImagePanorama( './asset/pano_vr1.jpg' );
panorama.addEventListener( 'progress', onProgressUpdate );
viewer = new PANOLENS.Viewer( { output: 'console', container: container } );

panorama.addEventListener( 'enter-fade-start', function(){
  viewer.tweenControlCenter( lookAtPositions[0], 0 );
});

//panorama2 = new PANOLENS.GoogleStreetviewPanorama('EoRzuVjoP8ft_wF6A9pyxQ');
panorama2 = new PANOLENS.ImagePanorama( './asset/pano_vr2.jpg' );
panorama2.addEventListener( 'progress', onProgressUpdate );
panorama2.addEventListener( 'enter', function(){
  viewer.tweenControlCenter( lookAtPositions[1], 0 );
});

panorama.link( panorama2, infospotPositions[0] );
panorama2.link( panorama, infospotPositions[1] );
viewer.add( panorama, panorama2 );

camera = viewer.getCamera();
scene = viewer.getScene();
renderer = viewer.getRenderer();

//var gridHelper = new THREE.GridHelper( 20, 20, '#adff2f', '#ff7f50' );
//scene.add( gridHelper );

viewer.update();