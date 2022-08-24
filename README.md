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

## Firebase 연동

    npm i firebase 라이브러리는 firestore backend 에 접속할 수 없다는 오류를 잡지 못 함
    대안으로 react-native-firebase 라이브러리를 사용해 firestore 에 접속
    collection - document - field 관계를 기억하고
    입력한 이모지, 텍스트가 Firestore 에 저장되게 함
    Field 에 Array 를 쓰려면 firestore.FieldValue.arrayUnion({},{},"a", 5, ) 형식으로 사용가능 => [{},{},"a",5] 의 Array 생성
    update funtion 을 사용시 계속해서 Array 에 data 가 추가됨!

## 5.5 Realm Listener 방법

    혼자서는 일일히 업데이트, 삭제, 추가등이 있을때마다 State 를 수정해줬는데
    Realm Listener((feelings, changes)) => 의 첫번째 인자에서 바뀐 feelings 얻을 수 있어 여기서 state를 업데이트 해주면 편함

## 5.6 LayoutAnimation / Realm addListener

    addListener 의 (바뀐object, changes) => 바뀐 object 로 업데이트된 오브젝트를 실시간으로 받을 수 있음
    업데이트 된 object 를 State 에 업데이트 함으로 항상 최신의 자료 저장가능


     LayoutAnimation.linear(); //State 에 변화를 주어 레이아웃이 바뀔때 애니메이션을 적용해!
     장소는 상관이 없다 useEffect 에서 부르면 RN 에게 이렇게 말한다
     State 가 바뀌어 View 가 변하면 그것에 대해 애니메이션을 추가한다
     안 쓸 이유가 없다
