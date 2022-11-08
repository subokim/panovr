let sidebar, cardlist, selected, menuButton, viewSrcButton;

cardlist = document.getElementsByClassName("card");
sidebar = document.getElementById("panel");
selected = 0;

function toggleSideBar() {
    if(sidebar.style.display == 'none') {
        sidebar.style.display = 'inline';
    } else {
        sidebar.style.display = 'none';
    }
}

function selectCard(id) {
    if ( selected !== null ) cardlist[selected].classList.remove( 'selected' );
    selected = id;
    cardlist[id].classList.add( 'selected' );
    sidebar.style.display = "none";

    var idx = 6 - id;
    viewSrcButton = document.getElementById("viewsource");
    viewSrcButton.href = 'https://github.com/subokim/panovr/blob/master/pano'+ idx +'.js';
    viewSrcButton.title = 'https://github.com/subokim/panovr/blob/master/pano' + idx + '.js';
}