# usage
1. server 폴더 안에 있는 config 폴더 안에 dev.js 파일을 생성한다.
2. MongoDB와 연결하기 위해서 dev.js file에 module.exports = { mongoURI: << MongoDB 주소 >> } 를 입력한다.
3. components 폴더에 Config.js 파일을 생성하고 아래 코드 입력(themoviedb)
```
    export const API_KEY = '<<API KEY>>';

    export const API_URL = '<<공통 API URL 앞부분>>';

    export const IMAGE_BASE_URL = '<<이미지 공통 API URL>>';

```
4. root directory에서 "npm install" 을 입력한다. (백엔드 종속성(dependencies) 다운로드)
5. client directory에서 "npm install" 을 입력한다. (프론트엔드 종속성(dependencies) 다운로드)
6. "npm run dev" 를 입력하여 백엔드, 프론트엔드 동시에 실행 가능하다.
