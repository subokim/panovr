# Panorama Tour Sample
이 프로젝트는 Panorama VR Viewer 를 학습하기 위해 입문용 샘플을 만들어 보는게 목표다.  
경량 웹 프로젝트로 node 를 사용하지 않고, [Panolens.js](https://pchen66.github.io/Panolens/)와 [Three.js](https://threejs.org/)를 이용하여 JavaScript 만으로 만들었다.  
[Three.js](https://threejs.org/)은 WebGL 를 래핑한 자바스크립트 3D 라이브러리이고, [Panolens.js](https://pchen66.github.io/Panolens/)는 [Three.js](https://threejs.org/)를 기반으로 만든 Panorama Viewer 프로젝트다.  
이 프로젝트는 두 개 라이브러리를 모두 사용하여 구현되었다.

[Web](http://subokim.github.io/panovr) - [Github](https://github.com/subokim/panovr)

## Start
```
git clone https://github.com/subokim/panovr.git
```

# 참고

## Ponolens
- Only JavaScript library from three.js without node.js

## Panolens import
```
  <script src="./js/three.js"></script>
  <script src="./js/panolens.min.js"></script>
```
- Panolens is JavaScript library from three.js
- three.js, panolens.js - All is needed.
- panolens.min.js : mini module of panolens.js

## Panorama object
- Default : SphereGeometry (radius 5,000, height_seg 40 width_seg 60)
- 3D coordinate system : three.js (OpenGL type)
- jpg source : big size ratio 2:1

## Panolens Viewer
- viewer = camera + mouse control + key control ...
- basic camera : THREE.PerspectiveCamera
- FOV default : 60 (1~10,000)

## angle To Vector
```
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
```
- 수평각, 수직각, 거리를 입력하면 그곳의 3차원 위치값을 가져옴.
- camera 의 기본 위치는 {0,0,1}
- step1 : z 값 기준 수평각만큼 이동, 그 위치에서 수직각만큼 이동
- step2 : 그 삼각형의 빗변값을 1로 변환(단위벡터화)
- step3 : 빗변값 * radius 를 해서 거리만큼 늘림
- step4 : 해당 위치값을 기준으로 {x,y,z} 값을 다시 찾음
- camera control : viewer.tweenControlCenter(position, 0)
- easing : null = no animation

FIN.
