### React Native Vertical Picker

- This is a performance-optimized numeric vertical picker.
- **It can also be used as a basic design and can be customized.**
- There is also a horizontal picker library -> [`react-native-number-horizontal-picker`](https://www.npmjs.com/package/react-native-number-horizontal-picker)

### NPM
[![npm version](https://badge.fury.io/js/react-native-number-vertical-picker.svg)](https://www.npmjs.com/package/react-native-number-vertical-picker)

### Github Page - Docs
https://github.com/hajeonghun/react-native-number-vertical-picker

### Preview
| Design | iOS | Android |
 |-------|-----|---------|
| Default | <img width="100%" src="https://github.com/hajeonghun/react-native-number-vertical-picker/assets/52861562/5a915c7f-0c53-4c99-a9d6-89fb79b9a7ad" /> | <img width="100%" src="https://github.com/hajeonghun/react-native-number-vertical-picker/assets/52861562/69f68e6b-bdc7-4624-92c6-eb428ba51016" /> |
| Custom Thumb | <img width="100%" src="https://github.com/hajeonghun/react-native-number-vertical-picker/assets/52861562/bb97eff1-23f0-4cda-b614-85e54cdd1850" /> | <img width="100%" src="https://github.com/hajeonghun/react-native-number-vertical-picker/assets/52861562/2a35318c-7991-4d30-b353-316b68f9a9a8" /> |
  
### Props
| Property | Type | Default | Description |
 |----------|------|---------|-------------|
| minimumValue | `number` | Required | Minimum value of measurement |
| maximumValue | `number` | Required | Maximum value of measurement|
| onChangeValue | `(value: number) => void;` | Required | Measured value during scroll event |
| customRenderItem | `(element: ListRenderItemInfo<number>, style: ViewStyle) => ReactElement` | View | This is a customizable block element, and refer to the attached Default image for the basic element |
| thumbElement | `ReactElement` | View | This is a thumbElement. If you want to change, please provide the element. |
| focusValue | `number` | minimumValue | The number to be focused on during the first rendering |
  
### Getting started
Installation
```
npm i react-native-number-vertical-picker
or
yarn add react-native-number-vertical-picker
```

* Usage - Default
```typescript
import VerticalPicker from 'react-native-number-vertical-picker';
import { Text, View } from 'react-native';

function App() {   
  return (
    <View>
      <Text style={{ fontSize: 25 }}>{value} cm</Text>
        <VerticalPicker
        minimumValue={0}
        maximumValue={200}
        focusValue={50}
        onChangeValue={handleChangeValue}
        />
    </View>
  )
}
```

* Usage - Custom Thumb and Item 
```typescript
import VerticalPicker from 'react-native-number-vertical-picker';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

// Custom Item Style
const styles = StyleSheet.create({
  block: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderColor: '#979797',
    width: 30,
    borderRightWidth: 1,
  },
});

// Custom Item Component
function CustomItem(style: ViewStyle){
  return (
    <View style={StyleSheet.compose(styles.block, style)} />
  );
}

function App() {
  // The Thumb element you desire.
  const thumbElement = (
    <Icon
      style={styles.thumb}
      name="caretright"
      size={30}
      color="rgba(255,0,0,0.7)" 
    />
  );

  /**
   * Please do not change the 'width' property under any circumstances. 
   * This is related to rendering optimization.
   */
  function renderItem(element: ListRenderItemInfo<number>, style: ViewStyle) {
    const { index } = element;
    let overWriteStyle: ViewStyle = { };

    // example code
    if (index < 9) {
      overWriteStyle = { ...style, borderBottomWidth: 0 };
    }
    // Return the component you want to customize.
    return <CustomItem style={overWriteStyle} />;
  }
  
  return (
    <View>
      <Text style={{ fontSize: 25 }}>{value} kg</Text>
        <VerticalPicker
        minimumValue={0}
        maximumValue={200}
        focusValue={50}
        onChangeValue={handleChangeValue}
        thumbElement={thumbElement} // Custom Thumb Element
        customRenderItem={renderItem} // Custom Item Element
  />
    </View>
  )
}
```




  
# MIT
