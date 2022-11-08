# Panorama Tour Sample
## 1.개요
- 이 폴더는 Panorama VR Viewer 를 만들기 위해 6개 샘플을 만들었습니다.
- Server 없이 JavaScript project 만으로 구현되었습니다.
- Basic Library로 panolens.js 와 three.js 를 이용했습니다.

### (1) Panolens.js
- [Panolens.js](https://pchen66.github.io/Panolens/) 는 three.js 에서 Panorama VR 과 관련된 함수만 추려서 만든 Wrapping Library입니다.

### (2) Three.js
- [Three.js](https://threejs.org/)는 WebGL 함수를 Wrapping Library 입니다.

## 2.페이지 소개
### (1) Simpla Panorama Tour
- Panorama 객체를 만들고 Camera를 중앙에 위치시키는 간단한 예제입니다.
- SphereGeometry를 만들어, Panorama 이미지를 Texture로 입혔습니다.
- 3D Scene 내에 Text 객체를 만들 수도 있지만, div tag 로 Title 을 만들어 배치했습니다.
- 3D Object, Camera, Scene 의 개념을 이해할 수 있습니다.

### (2) 3 Scene Panorama Toggle
- 3장의 Panorama 객체를 한번에 로딩하고, 버튼을 누르면 토글하는 예제입니다.
- viewer.setPanorama()의 기능을 이해할 수 있습니다.

### (3) Hotspot Link
- 2장의 사진을 로딩하고, 핫스팟 링크를 통해 이동할 수 있게 해줍니다.
- Info Icon 사용법과 Link 하는 방법을 익힙니다.

### (4) 2 Places, Walk
- 진행방향을 정하고, 링크를 눌러 다음 장소로 이동합니다.
- 현재 서있는 3D Scene 을 이해하고,
- 바라보는 방향과 거리를 기준으로 벡터위치값을 산정
- 이를 기준으로 진행방향과 링크를 삽입할 수 있습니다.

### (5) Google StreetView
- 구글 스트리트뷰의 단일 사진을 추출하여, Panorama Viewer 내에 구현합니다.
- 구글에서 찍은 사진만 불러올 수 있고, 사용자가 찍어올린 독립 파일은 불러지지 않습니다.
- Key 없이 해당 파일만 받아오는 방식이기 때문에, 임시용으로만 사용합니다.

### (6) Hotspot Infos
- 여러 개의 핫스팟을 삽입하고, 이를 클릭할 때 정보창이 보여지도록 했습니다.
- 핫스팟은 Panorama Space 내에 묶여서 이동하지만,
- 정보창은 적절한 위치에 고정되어 보이게 했습니다.

## 3.구현설명
### (1) panolens import
- panolens 는 three.js 를 이용해 구현된 오픈소스입니다.
- import 할 때 three.js 와 panolens.js를 둘다 해야 합니다.
- panolens.js 는 난독화된 파일로 panolens.min.js 를 제공합니다.
- panolens 함수는 인터넷 검색한 것과 조금씩 다릅니다.
- 다른 경우 소스코드를 보고, 추론해야 합니다.

### (2) ponolens 실행
- three.js 를 본격적으로 사용하려면, node.js 를 써야 합니다.
- 특히 webpack을 사용해서 서버를 꾸미고자 하는 경우라면 node.js 를 사용합니다.
- 하지만, 단순한 panorama view 를 사용하고 핸들링하는 정도라면, JavaScript library 만 import 해도 쓸만합니다.
- JavaScript library로는 내장된 함수들과 panorama view 를 컨트롤 할 수 있습니다.

### (3) panorama object에 대해
- panolens 는 기본적으로 SphereGeometry를 이용해 구현됩니다.
- 기본 좌표계는 three.js 를 따릅니다. 오른손 좌표계로 OpenGL과 같습니다.
- 촬영된 panorama 사진은 사이즈가 큰 2:1 화면비로 준비해야 합니다.
- 3차원 좌표로 SphereGeometry는 radius가 5,000 입니다.
- 위도는 40개, 경도는 60개 나뉘어진 구체입니다.

### (4) viewer 에 대해
- viewer는 camera를 기준으로 움직이는 컨트롤러 집합체입니다.
- mouse 등 입력컨트롤이 붙어 있습니다.
- 카메라는 기본적인 THREE.PerspectiveCamera 를 사용합니다.
- FOV 기본값은 60입니다.
- 조사한계는 1부터  10,000까지입니다.
- 특별히 건드릴 건 없습니다.

### (5) angle To Vector
- SphereGeometry 니까 나를 기준으로 타겟의 각도를 정하고 나로부터의 거리를 입력하면 그 곳으로 포커스를 옮기고 싶었습니다.
- viewer를 생성하는 경우, camera 의 기본 위치는 {0,0,1} 입니다.
- 쳐다볼 방향의 벡터좌표값을 가져와야 lookAt 를 할 수 있습니다.
- 첫째, z 값을 기준으로 수평각 만큼 이동하고, 그 위치에서 다시 수직값만큼 이동시켜 기준좌표를 찾았습니다.
- 둘째, {0,0,0} 에서 {x,y,z} 값 = 빗변값 = 벡터값, 정규화를 시켜 단위벡터로 만들었습니다.
- 셋째, 단위벡터에다가 거리를 곱해서 내가 보는 곳의 좌표를 구했습니다.
- 넷째, 그 좌표값을 역으로 계산하여 {x,y,z} 을 구했습니다.
- viewer.tweenControlCenter(position, 0) 을 하면 카메라가 해당 포지션을 중앙에 바라봅니다.
- easing 이란 애니메이션 효과입니다. 스무스하게 움직일 때의 완급을 조정합니다.
- easing 을 사용하진 않았습니다.
