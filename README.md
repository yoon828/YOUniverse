# Ⅰ. 서비스 소개
## 1. 서비스 설명

### 개요

- 한줄 소개 : 장애를 가진 사람들도 쉽게 화상 미팅을 사용할 수 있도록 도와주는 서비스
- 서비스 명 : YOUniverse (유니버스)

<br/>
<br/>

## 2. 기획 배경

### 배경

비대면 서비스가 일상이 되어버린 현재, 사람들은 비대면 서비스로 인해 편리함을 얻고 있습니다.
하지만 모두가 편리하다고 생각하는 와중, 오히려 더 불편함을 겪고 있는 사람들이 존재합니다.

시각 장애인들은 화상 미팅을 참여할 때 채팅을 보지 못합니다. 
청각 장애인은 화상 미팅을 참여할 때 음성을 듣지 못합니다.

이런 불편함을 해소하기 위해 YOUniverse에서는 소통을 원활할 수 있도록 해주는 여러가지 기능들을 제공합니다.
사람과 사람을 이어주는 YOUniverse를 통해 누구든지 제약없이 화상 미팅 서비스를 사용할 수 있습니다.



## 3. 서비스 화면
## 메인
사진 캡처해서 넣기
서비스 화면들



👇 시연영상 youtube 👇


## 4. 주요 기능
## 텍스트를 음성으로 변환
## 음성을 텍스트로 변환
## 입모양 확대




## 5. 디테일
## alt 태그
## 글씨크기 조절 

<br/>
<br/>

# Ⅱ. 개발

## 1. 개발환경



## 2. 기술 스택

### WebRTC

> WebRTC (Web Real-Time Communication)는 웹 브라우저 간에 플러그인의 도움 없이 서로 통신할 수 있도록 설계된 API이다. 
>
> W3C에서 제시된 초안이며, 음성 통화, 영상 통화, P2P 파일 공유 등으로 활용될 수 있다.

<br/>

### [openVidu](https://openvidu.io/)

![image-20210828152009951](README.assets/image-20210828152009951.png)

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

## 4. CICD/ SSL 인증서?

<br/>
<br/>


# Ⅲ. 프로젝트

## 1. 협업툴

### Jira
스프린트는 월~일까지 일주일을 스프린트의 기간으로 정했습니다.
매주 월요일에 일주일간 해야하는 태스크들을 정하고, 스프린트를 시작했습니다.
* 에픽은 페이지별로 화상룸, 마이페이지, 관리자 등으로 구성했습니다.
* 스토리는 사용자 입장에서 기능을 사용하는 과정으로 등록했습니다. 
* 


### Notion
프로젝트에 필요한 일정관리, 발표준비, api 명세 등을 정리하고, 팀원들이 볼 수 있도록 했습니다.



### Git Flow
master 브랜치 하위에 dev 브랜치를 생성하고, frontend와 backend 브랜치를 각각 생성했습니다.
각 기능별로 feature 브랜치를 생성하고, 완료된 기능은 frontend/backend 브랜치에 merge 했습니다.

#### branch convention
#### commit message


## 2. 백로그
개발을 시작하기 전, 전체적인 기능을 정리하기 위해 백로그를 작성했습니다. 
백로그는 화면 단위별로 작성했으며, Jira 및 branch naming을 작성할 때 백로그를 참고하였습니다.


## 3. 디자인
와이어 프레임을 작성하기 위해서 피그마를 사용했습니다. 

프로크리에이터를 사용하여 배경 및 아이콘 요소를 생성하였습니다.


# Ⅳ. 배포

## 1. Docker



# Ⅴ. 팀원 소개

* 김대현
* 김윤민
* 노은영
* 서은지
* 문서희
* 천지석






