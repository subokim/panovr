var panorama, viewer, scene, camera, renderer, controls ;
var infobox, infotitle, infodesc, infotext, bar;
var infospot, targetpos;

infotext = [
  { id: 1,
    title: '성균관 대성전 은행나무',
    desc: '공자가 은행나무 밑에서 제자들을 가르쳤다는 기록때문에, ' +
          '조선시대 교육기관에는 전통적으로 은행나무를 심었다. ' +
          '"승정원일기"에 따르면 이 은행나무를 심은 주인공은 중종때의 문신인 "윤탁"으로 전해진다.'},
  { id: 2,
    title: '성균관 대성전 느티나무',
    desc: '느티나무는 고향이 한국으로, 향교나 서원에서도 많이 심었다. ' +
          '여름이면 그늘이 시원해서 그 밑에서 공부를 했다. ' +
          '이 나무도 수령이 수백년은 된 것 같은데 정확한 정보는 알려져 있지 않다.'},
  { id: 3,
    title: '명륜당',
    desc: '명륜(明倫)이란 윤리를 밝힌다는 뜻으로, 맹자가 "학교를 세워 교육을 행함은 모두 인륜을 밝히는 것이다."라고 한 것에서 유래했다. ' +
          '명륜당은 학생들이 수업을 받는 강의장이기도 하지만, 과거시험을 볼 때는 왕이 여기에서 시제를 내기도 했다.' +
          ''},
  { id: 4,
    title: '동재',
    desc: '동재는 동쪽의 기숙사이다. 동재는 18칸으로 되어 있으며, 서재를 포함하면 총 28개의 방으로 구성되어 있다. ' +
          '전체 정원은 200명으로 유지했으니, 방수는 작았던 셈이다. ' +
          '동재의 첫방은 약방이고, 우제일방, 장의방, 진사칸 등으로 위계에 따른 순서가 있었다.'},
  { id: 5,
    title: '서재',
    desc: '서재는 서쪽의 기숙사이다. 학생들은 모두 식당에서 식사를 해야 했는데, 이걸로 출결을 확인했다.' +
          '1년에 300번을 출석해야 과거시험의 자격이 주어졌다고 한다. ' +
          '서재의 첫방은 서일방이고, 나머지는 동재와 같았다. 제일 끝방을 하재라 불렀다.'}
];

bar = document.querySelector( '#bar' );
infobox = document.getElementById("infobox");
infotitle = document.getElementById("infotitle");
infodesc = document.getElementById("infodesc");

function toggleInfoBox(visible) {
  if(visible) {
    infobox.style.display = 'inline';
  } else {
    infobox.style.display = 'none';
  }
}

function showInfoText( infoid ) {
  infotitle.innerText = infotext[infoid].title;
  infodesc.innerText = infotext[infoid].desc;
}

function addInfoSpot(pano, x_angle, y_angle, radius, infoid) {
  var targetpos = getVectorFromAngle(x_angle, y_angle, radius)
  var infospot = new PANOLENS.Infospot( 250, PANOLENS.DataImage.Info );
  infospot.position.copy(targetpos);
  infospot.addEventListener( 'click', function() {
    toggleInfoBox(true);
    showInfoText(infoid);
  });
  pano.add(infospot);
}

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

// Get Google Map API Key - https://developers.google.com/maps/documentation/javascript/get-api-key
//panorama = new PANOLENS.GoogleStreetviewPanorama( 'JmSoPsBPhqWvaBmOqfFzgA', 0 );
//,'AIzaSyAP7psgb_3x6cGqMDSQETHk7qZ7fCBYy0I'
//panorama = new PANOLENS.GoogleStreetviewPanorama('MbYbdJhoZNcXA3Fo5d3wUA');
panorama = new PANOLENS.ImagePanorama( './asset/pano_vr3.jpg' );
panorama.addEventListener( 'progress', onProgressUpdate );

addInfoSpot(panorama, 95, 0, 4000, 0);
addInfoSpot(panorama, -5, 0, 4000, 1);
addInfoSpot(panorama, -72, 8, 4000, 2);
addInfoSpot(panorama, 180, 3, 4000, 3);
addInfoSpot(panorama, 18, 0, 4000, 4);

//panorama.addEventListener( 'progress', onProgress );
panorama.addEventListener( 'click', function(){
  //camera.getWorldDirection(v);
});

viewer = new PANOLENS.Viewer( { container: container, cameraFov : 70 } );
viewer.add( panorama );

camera = viewer.getCamera();
scene = viewer.getScene();
renderer = viewer.getRenderer();
controls = viewer.getControl();

//var gridHelper = new THREE.GridHelper( 20, 20, '#adff2f', '#ff7f50' );
//scene.add( gridHelper );

//camera rotate, lookAt
targetpos = getVectorFromAngle(90, -5, 2000)
viewer.tweenControlCenter(targetpos, 0);
viewer.update();

controls.addEventListener( 'change', function() {
  toggleInfoBox(false);
});

