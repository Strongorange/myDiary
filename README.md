## 5.2

    기본적인 Navigation
    Wirte 컴포넌트에 TextInput 사용법, onSubmitEditing 등 숙지
    State 에 feeling(TextInput), Emoge 넣음

## 5.3 Realm SDK

    Realm 설치 후 오류가 계속 떠서 컴퓨터 재시작 후 npm start, 안드로이드 앱 아예 재빌드 하니까 오류 없어짐
    App.js 에 Realm 의 기본 설정인 FeelingSchema 저장 https://www.mongodb.com/docs/realm/sdk/react-native/
    Expo AppLoading 이 Deprecated 되어 Expo SplahshScreen 사용

## 5.4 Context

    useContext 를 사용하여 컴포넌트간 정보 공유를 쉽게 함
    realm 연결 자체를 Context 에 넣어 Write 컴포넌트에서 사용할 수 있게 함
    Context.Provider 의 value prop 으로 Context 에 들어갈 값을 집어넣고 useContext 를 이용하여 value 값 사용

    Write 에서 navigation: {goBack} 을 사용하여 입력 후 뒤로가기 이전 컴포넌트는 언마운트되어 state 초기호되어
    굳이 수동으로 setEmotion, setFeeling 을 null, "" 으로 초기화 해주지 않아도 됨
