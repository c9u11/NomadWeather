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

## ReactNative 기초

### Component

#### View

기본적으로 ReactNative는 Web이 아니라 APP이기 때문에 div 태그를 사용하지 못한다.

또한 react-native에서 **Import 하지 않으면 사용 할 수 없다.**

#### Text

ReactNative에서 모든 텍스트는 Text 태그안에 작성해야한다. 그렇지 않으면 오류를 마주 할 수 있다.

View와 동일하게 **Import 하지 않으면 사용 할 수 없다.**

#### StatusBar

StatusBar는 react-native에서 import 하지 않는다. **expo-status-bar에서 import를 해야한다.**



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

