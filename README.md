# Ⅰ. 서비스 소개
## 1. 서비스 설명

### 개요

저희 서비스의 이름인 YOUniverse는 너의 YOU와 세계의 universe를 합쳐 너와 함께하는 또 다른 세상이라는 뜻을 갖고있습니다.

여기서의 또 다른 세상이란 대면이 일상인 현실 세계, 즉 오프라인 세상과 반대되는 광활한 온라인 세상 속의 비대면 사회를 의미합니다.

따라서 저희가 만든 웹 서비스인 유니버스라는 기존과 또 다른 세상 속에서, 사람들은 장애의 구분 없이 시각, 청각 장애인 모두가 타인과의 자유로운 의사소통이 가능합니다.

<br/>
<br/>

## 2. 기획 배경

### 배경

코로나로 인해 대면 활동이 비대면으로 전환 됨에 따라 디지털 시대로의 전환이 가속화되고 있습니다.
특히 코로나 이전과 대비하여, 비대면 서비스의 이용 빈도가 가장 많이 증가한 항목은, 그룹 비디오 컨퍼런스 서비스입니다.

사람과 사람 사이의 만남이 비대면으로 전환 됨에 따라, 타인과 관계를 형성하고 소통하는 것에 대하여 장애인들은 어려움을 느낀다고 합니다. 

이러한 디지털 격차는 향후 더욱 심각해질 것으로 예상되며 따라서 저희는 이러한 IT 소외계층에게 기술로 다가가는 서비스를 만들고 싶어 YOUniverse를 기획하게 되었습니다.


## 3. 서비스 화면
### 로그인
![로그인.PNG](/uploads/844f75fc5b49f331ab17250b5008c1e7/로그인.PNG.png)

### 메인화면
![메인.PNG](/uploads/83759772c5593a75e55224e4f8f5aac6/메인.PNG.png)

### 공유하기
![공유하기](/uploads/4093145cab7896542e8d5e1e2850ae7e/공유하기.PNG)

### SPACE
![space.PNG](/uploads/07183e2d5fd7bf6e2d1db64fc38d7aa5/space.PNG.png)

### 로그창
![로그창.PNG](/uploads/981289fd6fedfce7d8e5fd3fcd0d1449/로그창.PNG.png)

![로그창_확대.PNG](/uploads/ee62ef20c05d4a5a73a004480f97f32a/로그창_확대.PNG.png)

### 입 확대
![입모양.PNG](/uploads/bc9973b4b51375d541d144d2704d460c/입모양.PNG.png)


### 마이페이지
![마이페이지.PNG](/uploads/fbaa64ef7340d932235b191edcbeeb85/마이페이지.PNG.png)

### 히스토리
![로그_히스토리.PNG](/uploads/6d27fcdec6215396ffc465752a282d9f/로그_히스토리.PNG.png)

### 1대1 문의
![1대1문의하기](/uploads/9344c2296d2033736efd60087ce04205/1대1문의하기.png)

![문의상세.PNG](/uploads/daea6384b781469691764e091ee83ca8/문의상세.PNG.png)

### 관리자페이지
![관리자페이지_메인.PNG](/uploads/8ac7476af173719bd04af63cebe37c2d/관리자페이지_메인.PNG.png)
![관리자페이지QA.PNG](/uploads/e02a80d16d62fa2a86be9827e2a85a42/관리자페이지QA.PNG.png)
![관리자페이지회원관리.PNG](/uploads/3e78a0dd30a3a98ce71e94f1fa01119f/관리자페이지회원관리.PNG.png)





### 👇 시연영상 youtube 👇
[🎞시연 영상 링크]()

## 4. 주요 기능

## 텍스트를 음성으로 변환
마이크로 대화가 불가능한 사람들은 화면 하단, 중앙에 위치한 입력 창을 통해 키보드로 입력이 가능합니다.


시각 장애인을 위한 음성 서비스는 TTS API를 활용하여 다른 사용자의 텍스트 입력을 음성으로 모두 변환하여 들려줍니다


## 음성을 텍스트로 변환
청각 장애인을 위한 자막 서비스는 STT API를 활용하여 다른 사용자의 음성 입력을 텍스트로 모두 변환하여 보여줍니다


## 입모양 확대
구어(음성언어)로 대화하는 청각장애인은 입 모양을 보아야 상대방이 말하고자 하는 그 메시지를 정확하게 이해할 수 있다고 합니다. 저희는 FACE api를 활용하여 입모양 확대 버튼을 눌렀을 때 다른 사람의 입을 확대해주었습니다.

## 로그 기록
실시간 대화 속도가 빨라 대화를 놓친 경우 또는 발화자 화면 하단에 제공되는 자막을 모두 읽지 못한 경우에는우측 파란색 박스의 대화 로그를 통해 내용을 다시 확인하여 소통을 이어갈 수 있습니다.





## 5. 디테일
## 식별 아이콘 
이름 앞에는 식별 아이콘을 넣어 로그 확인 시, 해당 로그의 발신자를 /화상 화면에서 쉽게 찾을 수 있도록 했습니다. 추가적으로 색깔 구분이 힘든 사용자를 고려하여, 색깔이 아닌 모양으로 발신자를 식별할 수 있게 했습니다.  

## alt 태그
화면에 보이는 모든 버튼에 alt 속성을 부여하고, 페이지 내의 주요 기능을 화면 상단으로 배치하여 시각 장애인이 스크린 리더를 활용하였을때 이용에 불편함이 없도록 구성하였습니다.
## 글씨크기 조절
글씨 크기 축소, 확대 버튼을 사용해서 로그창에서 로그 글씨 크기를 조절할 수 있습니다.

## 색상 선정
저희는 명암 대비가 4.5 이상인 색의 조합을 사용하여 색약 사용자의 편의성과 가독성을 높였습니다.

## 간단한 UI/UX
심플한 UI/UX를 설계하기 위해 폰트의 기본 크기는 20px로 하였으며 또한 각 페이지 내부 요소를 간소화하여 사용자가 편안하고 쉽게 사용할 수 있도록 하였습니다.




<br/>
<br/>

# Ⅱ. 개발

## 1. 개발환경



## 2. 기술 스택

### WebRTC

> WebRTC (Web Real-Time Communication)는 웹 브라우저 간에 플러그인의 도움 없이 서로 통신할 수 있도록 설계된 API이다. 
>
> W3C에서 제시된 초안이며, 음성 통화, 영상 통화, P2P 파일 공유 등으로 활용될 수 있다.

<br/>

### [openVidu](https://openvidu.io/)


> OpenVidu is a platform to facilitate the addition of video calls in your web or mobile application. It provides a complete stack of technologies very easy to integrate in your application. Our main goal is to allow developers to add real-time communications to their apps very fast and with low impact in their code.


<!-- 
WebRTC를 보다 간단하게 적용할 수 있고, 다양한 프레임워크와 호환성이 높은 openvidu를 사용하여 프로젝트를 진행했습니다. 사용 방법은 openvidu tutorail 또는, 프로젝트의 front 폴더 하위의 gameroom 등에서 확인 할 수 있습니다.
-->

<br/>

YOUniverse에서 openvidu를 사용해서 WebRTC를 구현합니다. 실시간으로 여러명과 소통이 가능하며, 링크를 통해 다른 사람들를 초대할 수 있습니다.

<br/>
<br/>

### [face API](https://github.com/justadudewhohacks/face-api.js)

> JavaScript face recognition API for the browser and nodejs implemented on top of tensorflow.js core


YOUniverse에서는 face api에서 land mark를 기능을 사용합니다. 입 모양을 확대하기 위해서 face api에서 입의 위치를 가져오고, 그 위치를 기반으로 입 부분만 확대해서 보여주는 기능을 제공합니다.

<br/>

### [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

> web Speech api 설명

YOUniverse에서는 web Speeck API를 사용해서 TTS(Text To Speech)와 STT(Speech To Text)를 구현합니다. 마이크가 켜져있는 동안에 STT를 사용해서 사용자의 음성을 텍스트로 변환하고, 로그창에 기록합니다.
또한 시각 장애인을 위해 TTS를 사용해서 텍스트를 음성으로 읽어주는 기능이 포함되어 있습니다.

<br/>
<br/>



## 3. 서비스 아키텍처

서비스 아키텍처 사진 넣기

## 4. CICD/ SSL 인증서

<br/>
<br/>


# Ⅲ. 프로젝트

## 1. 협업툴

### Jira
스프린트는 월~일까지 약 일주일을 스프린트의 기간으로 정했습니다.
매주 월요일에 일주일 동안 해야하는 태스크들을 정하고, 스토리 포인트와 담당자를 등록 후 스프린트를 시작했습니다.
* 에픽은 페이지별로 화상룸, 마이페이지, 관리자 등으로 구성했습니다.
* 스토리는 사용자 입장에서 기능을 사용하는 과정으로 등록했습니다. 
* 태스크는 개발할 기능들을 나눠서 작성했습니다.


### Notion
프로젝트에 필요한 일정관리, 발표준비, api 명세 등을 정리하고, 팀원들이 볼 수 있도록 했습니다.

[노션 링크]


### Git Flow
master 브랜치 하위에 dev 브랜치를 생성하고, frontend와 backend 브랜치를 각각 생성했습니다.
각 기능별로 feature 브랜치를 생성하고, 완료된 기능은 frontend/backend 브랜치에 merge 했습니다.

#### convention
[🤝개발 컨벤션](https://www.notion.so/458ce39591f9401ebe02308e6cef270c)
원활한 의사소통을 위해 convention을 정하여 커밋과 브랜치를 생성하였습니다.


## 2. 백로그
개발을 시작하기 전, 전체적인 기능을 정리하기 위해 백로그를 작성했습니다. 
백로그는 화면 단위별로 작성했으며, Jira 및 branch naming을 작성할 때 백로그를 참고하였습니다.
![백로그](/uploads/6597aac4d4e8ae7a784bdedc9961fff5/백로그.gif)


## 3. 디자인
와이어 프레임을 작성하기 위해서 피그마를 사용했습니다. 
![image](/uploads/42fce88fc4d9b317ec7a8001df32606e/image.png)


프로크리에이터를 사용하여 배경 및 아이콘 요소를 생성하였습니다.




# Ⅴ. 팀원 소개

* 김대현
* 김윤민
* 노은영
* 서은지
* 문서희
* 천지석






