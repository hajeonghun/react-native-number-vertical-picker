import React, {
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    FlatList,
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import DefaultItem from './DefaultItem';
import { ListRenderItemInfo } from '@react-native/virtualized-lists/Lists/VirtualizedList';

const MULTIPLICITY = 1;

interface VerticalPickerProps {
    minimumValue: number;
    maximumValue: number;
    onChangeValue: (value: number) => void;
    customRenderItem?: (
      element: ListRenderItemInfo<number>,
      style: ViewStyle,
    ) => ReactElement;
    thumbElement?: ReactElement;
    focusValue?: number;
    visibleItemCount?: number;
}

function VerticalPicker({
                            minimumValue,
                            maximumValue,
                            onChangeValue,
                            customRenderItem,
                            thumbElement,
                            focusValue,
                            visibleItemCount = 20,
                        }: VerticalPickerProps) {
    const flatList = useRef<FlatList>(null);
    const [oneItemHeight, setOneItemHeight] = useState(0);
    const [thumbHeight, setThumbHeight] = useState(0);
    const data = Array.from(
      { length: maximumValue - minimumValue + visibleItemCount },
      (_, index) => index + 1,
    );

    const defaultThumbElement = (height: number) => <View style={StyleSheet.compose(styles.thumb, {top: height})} />;

    function onLayout({ nativeEvent }: LayoutChangeEvent) {
        const calculatedWidth = Math.round(
          nativeEvent.layout.height / visibleItemCount,
        );
        setThumbHeight(nativeEvent.layout.height / 2)
        setOneItemHeight(calculatedWidth);
    }

    function renderItem(element: ListRenderItemInfo<number>) {
        const { index } = element;
        let style: ViewStyle = { height: oneItemHeight }; // Require height

        if (index < (visibleItemCount / 2) - 1 || index > data.length - visibleItemCount + (visibleItemCount / 2) - 1) {
            style = { ...style, borderBottomWidth: 0 };
        }

        if ((index + 1) % 10 === 0 && index + 1 <= maximumValue) {
            style = { ...style, width: 40, borderBottomWidth: 3 };
        }

        if (customRenderItem) {
            // Require height
            return customRenderItem(element, style);
        }

        return <DefaultItem style={style} />;
    }

    function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        let value =
          minimumValue +
          Math.floor(event.nativeEvent.contentOffset.y / oneItemHeight) *
          MULTIPLICITY;

        if (value < minimumValue || value > maximumValue) {
            return;
        }

        onChangeValue(value);
    }

    const scrollToElement = useCallback(
      (value: number) => {
          flatList.current &&
          flatList.current.scrollToOffset({
              offset: ((value - minimumValue) * oneItemHeight) / MULTIPLICITY,
              animated: false,
          });
      },
      [minimumValue, oneItemHeight],
    );

    useEffect(() => {
        function hasFocusValue(value: number | undefined) {
            return value !== null && value !== undefined;
        }

        if (!hasFocusValue(focusValue)) {
            return;
        }

        setTimeout(() => scrollToElement(focusValue as number), 0); // 타입 컴파일러가 제대로 추론 못함.
    }, [focusValue, scrollToElement]);
    return (
      <View style={styles.mainContainer} onLayout={onLayout}>
          <FlatList
            ref={flatList}
            style={styles.wrapper}
            showsVerticalScrollIndicator={false}
            keyExtractor={(element, index) => index.toString()}
            data={data}
            renderItem={renderItem}
            onScroll={onScroll}
            getItemLayout={(data, index) => ({
                length: oneItemHeight,
                offset: oneItemHeight * index,
                index,
            })}
          />
          {thumbElement ? thumbElement : defaultThumbElement(thumbHeight)}
      </View>
    );
}

export default VerticalPicker;

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        height: '100%',
        width: 80,
    },
    wrapper: {
        flex: 1,
    },
    thumb: {
        position: 'absolute',
        borderTopWidth: 3,
        width: 60,
        borderColor: 'red',
        backgroundColor: 'orange',
        alignSelf: 'center',
        top: '49%',
    },
});
