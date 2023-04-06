# Getting Started with Hantry

브라우저, Node 에서 쉽고 간편하게 에러를 Catch 하고 확인하세요!  
Front- https://hantry.netlify.app/login <br/>
Webpack Plugin -https://www.npmjs.com/package/hantry-webpack   <br/>
Browser -https://www.npmjs.com/package/hantry-js-react  <br/>
Node -https://www.npmjs.com/package/hantry-js-node  <br/>
Profiler - https://www.npmjs.com/package/hantry-js-profiler<br/>

## 개발환경

- NPM
- Lerna
- Slack Oauth
- React
- WebPack Plugin
- Express

## How TO Start

- Webpack Plugin (컴파일에러를 잡고 소스맵 업로드를 담당합니다)

```
npm install hantry-webpack
```

webpack config plugin

options = { sourcemap: boolean }

```
  plugins: [new HantryPlugin(options, "your dsn")],
```

- Browser (런타임에러를 잡고 BreadCrubs, Profiler, RejectionError를 제공합니다)

```
npm install hantry-js-react

import {init} from "hantry-js-react
```

options = { rejection: boolean, breadcrumbsClick: boolean, breadcrumbsURL: boolean, profiler: boolean }

```
  init(options,"your dsn")
```

- Node (Node 버전입니다.)

```
npm install hantry-js-node

import {init} from "hantry-js-react
```

options = {}

```
  init(options,"your dsn")
```

## User Flow

로그인

![Recording 2022-07-19 at 09 42 26](https://user-images.githubusercontent.com/62933450/180005984-d150ad46-e62b-4b26-b55d-48cbf4537807.gif)

프로젝트 생성

<img width="1195" alt="image" src="https://user-images.githubusercontent.com/62933450/180009390-7fd7a8f8-3d4f-4445-b4a1-ed9b8ef4a313.png">

<img width="1191" alt="image" src="https://user-images.githubusercontent.com/62933450/180009229-8eb48a5f-90c4-4eff-88fa-6f96375792d9.png">

알람타입에서 Slack 과 Email을 고를 수 있습니다.

Slack 으로 진행해 보겠습니다.

프로젝트 생성시 DSN을 디테일 페이지에서 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/62933450/180009821-d8030450-5123-4d58-8fea-1618e4ce06e6.png)

DSN을 받은 후 , init 설정을 본인 프로젝트에서 할 수 있습니다. (이름은 browser로 변경예정입니다)

![image](https://user-images.githubusercontent.com/62933450/180010264-a832c7a8-2742-4ec4-bb7d-4ad36cc62436.png)

profiler 만 사용하고 싶을 시 , profiler 라이브러리만 import해서 설정 가능합니다.

Compile Error 도 Catch 하고 싶을 시 ,

웹팩설정 플러그인에 추가해주시면 됩니다.

![image](https://user-images.githubusercontent.com/62933450/180011319-d7be1099-808a-4472-a5f9-498ade6c4531.png)

더욱 더 정확한 정보를 원한다면,

![image](https://user-images.githubusercontent.com/62933450/180011405-0b3fce89-1292-4f44-86db-9542fb641b6a.png)

devtool을 source-map 으로 변경하거나 직접 Hantry 페이지에서 source-map을 첨부 가능합니다.

![Recording 2022-07-19 at 22 37 20](https://user-images.githubusercontent.com/62933450/180007650-02a51625-efd7-4663-b74a-c4e0e3eca874.gif)

Type이 Email이라면 그냥 이메일만 입력하면 자동으로 이메일을 보내주지만, Slack의 경우 슬랙봇을 워크플레이스 채널에 추가해 주어야 합니다. Setting 페이지에 버튼이 있습니다.
<img width="166" alt="image" src="https://user-images.githubusercontent.com/62933450/180011767-a4b03aeb-b4be-4e53-a268-e7f7d3d423fe.png">

<img width="1512" alt="image" src="https://user-images.githubusercontent.com/62933450/180011891-8ab1bdef-3f52-43ff-86b8-5954aaaafa43.png">

<img width="358" alt="image" src="https://user-images.githubusercontent.com/62933450/180012420-b7cb68bf-28ca-486c-84c1-b0dd6ca28a20.png">
<img width="214" alt="image" src="https://user-images.githubusercontent.com/62933450/180012501-e2348845-918d-479b-90b2-1a711c4428bf.png">
<img width="448" alt="image" src="https://user-images.githubusercontent.com/62933450/180012542-8a3840f3-6463-4a4f-b227-bfcd38ebcc10.png">

추가된 봇을 구독을 원하는 채널에 추가시킨후, slash 명령어를 통해, DSN정보를 보내줍니다.

이제 에러를 발생시켜 보겠습니다. 방금 추가한 워크스페이스 및 채널은 방금 생성한 채널과 워크스페이스입니다.

![image](https://user-images.githubusercontent.com/62933450/180012012-17837e01-8634-4976-b842-1eb607635600.png)

슬랙에 알림이 나오는것을 볼 수 있습니다.

이메일 예시입니다.

![image](https://user-images.githubusercontent.com/62933450/180013106-cd5f318c-10a1-4061-a4d1-b4641f626ddb.png)

프로젝트 페이지입니다
![image](https://user-images.githubusercontent.com/62933450/180012848-386e2ced-018e-4c3e-b2a0-55ba6334b91c.png)
<img width="1485" alt="image" src="https://user-images.githubusercontent.com/62933450/180014052-5445ff79-0a05-4e91-b3fa-1fc85b4878cb.png">
<img width="1461" alt="image" src="https://user-images.githubusercontent.com/62933450/180014123-2dc4abbc-7c48-43a7-a72b-6aff5387a72e.png">
<img width="1467" alt="image" src="https://user-images.githubusercontent.com/62933450/180014252-f856d3a6-0346-4a05-9704-05154bb724fe.png">

시각화된 그래프로도 볼 수 있습니다. 프로젝트 개요에서 클릭시 , 에러 디테일페이지로 이동합니다.

에러리스트 페이지입니다.

<img width="1481" alt="image" src="https://user-images.githubusercontent.com/62933450/180016657-ae0c8b73-a311-4cc0-9ac4-25d657c3b97f.png">
<img width="1492" alt="image" src="https://user-images.githubusercontent.com/62933450/180014894-b18aa323-1940-472b-8378-afd572fc1b10.png">

에러 리스트 페이지에서는 프로젝트 별, 날짜별 정렬, 검색 등의 기능을 제공합니다 클릭시 에러 디테일 페이지로 이동합니다.
<img width="1469" alt="image" src="https://user-images.githubusercontent.com/62933450/180014972-32b97d65-4607-445f-9665-bf4df67c5dcc.png">
<img width="1487" alt="image" src="https://user-images.githubusercontent.com/62933450/180015031-a8139965-a7ca-4dae-b99b-fd323cda906c.png">
<img width="1449" alt="image" src="https://user-images.githubusercontent.com/62933450/180015069-6a48f66a-cbf4-4c68-b5fe-72cec8604f43.png">

디테일 페이지에서는 user 정보, 에러의 breadcrumbs, stack등의 자세한 정보를 제공해 줍니다.

조금 더 정확한 정보를 원할 시, 소스맵을 업데이트 해야 합니다.
Profile페이지입니다.  
Profile 페이지에서는 프로젝트 Performance를 볼 수 있습니다. 클릭시 디테일 페이지로 이동 가능합니다.

![Recording 2022-07-20 at 06 18 38 (1)](https://user-images.githubusercontent.com/62933450/180015288-76a8237a-3210-4bef-8f6e-e1ced19bfa30.gif)
![image](https://user-images.githubusercontent.com/62933450/180015431-41b0b67f-2433-4bb9-b2e4-97ff9259c869.png)

Settings 페이지에서는 Project Create 시 했던 정보들을 수정할 수 있습니다.

<img width="1475" alt="image" src="https://user-images.githubusercontent.com/62933450/180016863-3a190a82-41ed-4e88-97f0-2f734c349d17.png">

## 주요 기능

- **UnhandledError**: NPM으로 배포한 라이브러리를 통해서 **unhandledError**, **RejectionError**, 에러가 발생한 **UserInfo(Browser,Os..etc)**, **Error Stack**, 등 에러에 관한 정보를 캐치할 수 있습니다. 에러가 발생한 순간의 정보들을 캐치 한후 서버로 보내게 했습니다.
  - **Breadcrumbs:** Error 의 Breadcrums 도 추적하게 했습니다. Click 과 URL에 대해서 추적하게 했습니다. URL 의 경우 hashchange event는 hash가 변경될때만 일어나고, popstate 의 경우 pushstate가 된 뒤, 앞으로가기 등의 경우 일어나고 다른경우 일어나지 않는 경우가 있었습니다.
    그래서 pushstate, relpaceevent를 커스텀하게 수정하고, 커스텀된 pushstate, replaceevent 와 기존의 popstate에서 새로운 url 변경이벤트를 보내게 만들어서 캐치했습니다.
- **Visualize**: 사용자는 이를 Front의 배포된 사이트에서 그래프 및 디테일한 정보를 확인할 수 있습니다.
  현제 **Vue, angular, react** 등의 모든 브라우저 **JS**와, **NodeJS** 버전을 지원합니다.

- **Compile Error** **WebPack PlugIn**: 런타임 환경에서 캐치할 수 없는 컴파일 환경의 에러는 **WebPack PlugIn**으로 캐치하게 했습니다. 이를 통해서 **compiler hook**의 **emit** 에서 접근할 수 있는 **compilation** 에서 에러를 찾아 이를 파싱한 후 서버로 보내게 해서 컴파일 에러를 캐치하게 했습니다.

- **Souce Map** : 런타임 환경에서 에러를 캐치하면, 위치 등의 정보가 **bundle.js**기준으로 나오게 됩니다. 이를 해결하기 위해 사용자의 **Source Map**을 받게 했습니다.
  **Source Map**을 받는 방식은 2가지가 있습니다.

- **DND Modal**: 첫번째로 Front 의 Setting 창에서 직접 **DND**로 구현한 모달창에 JS파일을 올리는법이 있습니다. 이를 파일폼으로 받은 후 그대로 DB에 저장하게 했지만, 추후 S3로 전환하는 방법을 생각하고 있습니다.

- **WebPack**: 두번째 방법은 **WebPack PlugIn** 을 이용하는 방법입니다. devtool 을 sourcemap으로 전환하면, sourcemap을 읽어 자동으로 서버로 보내게 했습니다. **compiler hook 의 done환경에서 stats**에 접근 할 수 있는데 이때 정보를 받은 후 읽어 서버로 보내게 했습니다.

- **Email**: 서버에서 에러를 받았을때, 프로젝트의 DSN을 확인한 후 , 프로젝트 설정이 Alram Type Email 이면 에러의 정보를 사용자의 이메일로 보내게 했습니다. 즉각적으로 에러에 대응할 수 있도록 했습니다.
- **Slack Bot**: 마찬가지로, 서버에서 에러를 받았을 때, 에러말고도 Slack 으로도 알람을 받을 수 있게 했습니다.
  **Slack Bot**을 만든 후, Oauth 인증을 거쳐 배포시켰습니다. Setting에서 제공하는 버튼으로 **Hantry Slack bot**을 워크스페이스에 추가한 후 Slash 명령어를 통해 구독하면, **Slack Bot**이 에러가 발생했을 시 자동으로 메세지를 보내주게 했습니다. 지금은 백엔드 서버에 같이 존재하지만 추후 lamda 서버를 따로 팔 예정입니다.

- **PerformanceObserver:** 웹 프로파일러를 제공하기위해 라이브러리도 따로 배포했습니다. 사실 Sentry는 리액트의 경우 **Profiler Component**를 따로 지원 해주고 이를 이용할까 고민도 했습니다. 하지만 이 한기능을 위해서 리액트를 의존하게 하는것이 너무 과하게 느껴졌고 **PerformanceObserver 라는 기능을 사용하기로 했습니다.** 이를 통해 first Input, paint, long take, largest paint, navigate, layourshift 등등의 performance 요소 를 관측하고 기록해 서버로 보내게 했습니다.

## 회고 및 아쉬운 점

- Redux Thunk를 사용했는데, Redux가 본래의 상태관리 역할 보다는 서버 관련 상태를 다루는 역할의 비중이 더 많았다. 
  이를 좀 더 분리하면 추후 문제가 생길 시 유지 보수하기 쉬울거라 생각했다. React Query같이 Server State를 분리를 해보고 싶다.
  
- Custom hook 패턴을 적용했다. 적용하면서 이 패턴을 잘 쓰려면 변수명 작명을 잘 해 Component에서 그 의도를 알아야 된다 생각했다. 
  그래서 여러번 수정을 했지만 아직 아쉬운 부분이 있다.
  
- 3rd party 라이브러리를 아예 사용하지 않고 라이브러리를 개발하고 싶었는데 시간상의 이유로 하지못해 아쉽다. 
  이외에도 Performance Observer 자체가 성능을 저하시키는 이슈가 있어, 실제 서비스 중인 웹사이트에 적용시키기 어렵다는 점이 아쉽다. 
  차라리 도메인을 입력하면 Light house 처럼 점수를 알려주는 방식으로 바꿔보고 싶다.

