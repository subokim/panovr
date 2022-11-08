let sidebar, cardlist, selected;

cardlist = document.getElementsByClassName("card");
sidebar = document.getElementById("panel");
selected = 0;
// sidebar.style.display ="none"; 

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
}