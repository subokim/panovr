var container, panorama, viewer, title;

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

container = document.querySelector('#container');
title = document.getElementsByClassName('title');
panorama = new PANOLENS.ImagePanorama('./asset/pano_vr3.jpg');

viewer = new PANOLENS.Viewer({container: container});
viewer.add(panorama);
