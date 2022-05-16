# NomadWeather

## 개요

이 프로젝트는 React Native를 처음 사용해보는 프로젝트입니다.

## 설치

일단 Expo를 사용하기 때문에 Expo를 먼저 설치한다.

```bash
npm install --global expo-cli
```

추가로 watchman이라는 파일 변경 추적을 위한 툴을 설치한다.

```bash
brew update
brew install watchman
```

기본적으로 설치되어야 하는 것들이 모두 설치되었다면 아래 명령어를 통해서 프로젝트를 생성해준다.

```bash
expo init {ProjectName}
```

프로젝트가 잘 생성되었는지 프로젝트를 실행하여 확인한다.

```bash
expo start
```

 프로젝트가 성공적으로 실행되었다면 Localhost의 19001번 또는 19002번 포트를 통해 Expo Dev Tools에 접속 할 수 있다.

## Expo 사용

```bash
expo start
```

expo를 시작한 후 command 목록을 확인 할 수 있는데 자주 사용 할 수 있는 목록을 아래에 작성했다.

### r - Reload

기본적으로 저장을 하면 reload가 되는데 제대로 동작하지 않을 시 직접 r command를 사용하여 reload 할 수 있다.

### m - Menu

에뮬레이터 또는 실제 디바이스로 앱을 확인 중이라면 메뉴로 가는 버튼이 없을 것이다.

이때는 m command를 사용하면 메뉴를 열어 확인 할 수 있다.

또한 디바이스를 흔들거나 세 손가락으로 누르고 있으면 메뉴를 여는 옵션도 있어 이를 통해 메뉴를 열면 된다.

#### d - developer tools

내가 developer tools를 닫아 다시 열고 싶을 때는 localhost로 접속하면 되지만 d command를 사용하면 더욱 쉽게 열 수 있다.



## ReactNative 기초

### Component

#### View

기본적으로 ReactNative는 Web이 아니라 APP이기 때문에 div 태그를 사용하지 못한다.

또한 react-native에서 **Import 하지 않으면 사용 할 수 없다.**

기본적으로 **Flex Container**이다. 또한 flex-direction의 기본값은 **column**이다.

#### Text

ReactNative에서 모든 텍스트는 Text 태그안에 작성해야한다. 그렇지 않으면 오류를 마주 할 수 있다.

View와 동일하게 **Import 하지 않으면 사용 할 수 없다.**

#### StatusBar

StatusBar는 react-native에서 import 하지 않는다. **expo-status-bar에서 import를 해야한다.**

StatusBar는 Component를 사용하지 않아도 기본적으로 나오게 된다.



### Styles

Style 속성은 web과 다르게 일부는 사용하지 못한다. (예 : border 등)

그래서 자동 완성 기능을 사용하면 매우 유용하다.

Web과 다르게 React Native는 css에서 오타 등 잘못된 값을 적으면 Error를 표시해준다.

#### StyleSheet.create()

StyleSheet.create() 를 통하여 아래와 같이 object를 생성하고 해당 style을 속성에서 사용 할 수 있다.

이는 꼭 필수로 작성해야하는 건 아니다. 아래와 같이 태그에 직접 Object로 작성해도 괜찮다. 또한 Object를 따로 작성해도 문제는 없다. 하지만 Object를 따로 생성 할 경우에는 Style Object의 Key 자동완성 기능을 사용 할 수 없다.

코드를 깔끔하게 정리하고 자동완성을 사용하는 이점때문에 Stylesheet.create()를 사용하는 것이 편하다.

```react
return (
    <View style={styles.container}>
      <Text style={{fontSize: 28}}>Hello! I made a RN App!</Text>
      <StatusBar style="auto" />
    </View>
  );

...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
  },
});
```

### Flex

레이아웃을 만들 때 flex를 사용하여 모든 디바이스 기기에서 비율에 맞도록 만들 수 있다.

```react
import { View } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "tomato" }}></View>
      <View style={{ flex: 2, backgroundColor: "teal" }}></View>
      <View style={{ flex: 1, backgroundColor: "orange" }}></View>
    </View>
  );
}
```

