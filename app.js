var blocks = document.getElementById("blocks");
var hole = document.getElementById("hole");

var blocks_hight = 500; //?
var hole_hight = 150; //?

//our hole every iteration must be on a different hight

hole.addEventListener('animationiteration', () => {
    var random = -(Math.random()*300 + hole_hight); /* от 150 до 450 */
    hole.style.top = random + "px";
})