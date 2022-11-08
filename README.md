# panolens
- 이 폴더는 panolens 를 테스트하기 위한 겁니다.
- angle To Vector 함수를 구현했습니다.

## panolens import 하기
- panolens 는 three.js 를 이용해 구현된 오픈소스입니다.
- import 할 때 three.js 와 panolens.js를 둘다 해야 합니다.
- panolens.js 는 난독화된 파일로 panolens.min.js 를 제공합니다.
- panolens 함수는 인터넷 검색한 것과 조금씩 다릅니다.
- 다른 경우 소스코드를 보고, 추론해야 합니다.

## ponolens 실행하기
- three.js 를 본격적으로 사용하려면, node.js 를 써야 합니다.
- 특히 webpack을 사용해서 서버를 꾸미고자 하는 경우라면 node.js 를 사용합니다.
- 하지만, 단순한 panorama view 를 사용하고 핸들링하는 정도라면, JavaScript library 만 import 해도 쓸만합니다.
- JavaScript library로는 내장된 함수들과 panorama view 를 컨트롤 할 수 있습니다.

## panorama object에 대해
- panolens 는 기본적으로 SphereGeometry를 이용해 구현됩니다.
- 기본 좌표계는 three.js 를 따릅니다. 오른손 좌표계로 OpenGL과 같습니다.
- 촬영된 panorama 사진은 사이즈가 큰 2:1 화면비로 준비해야 합니다.
- 3차원 좌표로 SphereGeometry는 radius가 5,000 입니다.
- 위도는 40개, 경도는 60개 나뉘어진 구체입니다.

## viewer 에 대해
- viewer는 camera를 기준으로 움직이는 컨트롤러 집합체입니다.
- mouse 등 입력컨트롤이 붙어 있습니다.
- 카메라는 기본적인 THREE.PerspectiveCamera 를 사용합니다.
- FOV 기본값은 60입니다.
- 조사한계는 1부터  10,000까지입니다.
- 특별히 건드릴 건 없습니다.

## angle To Vector
- SphereGeometry 니까, 나를 기준으로 타겟의 각도를 정하고 나로부터의 거리를 입력하면 그 곳으로 포커스를 옮기고 싶었습니다.
- viewer를 생성하는 경우, camera 의 기본 위치는 {0,0,1} 입니다.
- 쳐다볼 방향의 벡터좌표값을 가져와야 lookAt 를 할 수 있습니다.
- 첫째, z 값을 기준으로 수평각 만큼 이동하고, 그 위치에서 다시 수직값만큼 이동시켜 기준좌표를 찾았습니다.
- 둘째, {0,0,0} 에서 {x,y,z} 값 = 빗변값 = 벡터값, 정규화를 시켜 단위벡터로 만들었습니다.
- 셋째, 단위벡터에다가 거리를 곱해서 내가 보는 곳의 좌표를 구했습니다.
- 넷째, 그 좌표값을 역으로 계산하여 {x,y,z} 을 구했습니다.
- viewer.tweenControlCenter(position, 0) 을 하면 카메라가 해당 포지션을 중앙에 바라봅니다.
- easing 이란 애니메이션 효과입니다. 스무스하게 움직일 때의 완급을 조정합니다.
- easing 을 사용하진 않았습니다.
