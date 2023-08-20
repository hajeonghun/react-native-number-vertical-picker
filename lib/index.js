var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useCallback, useEffect, useRef, useState, } from 'react';
import { FlatList, StyleSheet, View, } from 'react-native';
import DefaultItem from './DefaultItem';
var MULTIPLICITY = 1;
function VerticalPicker(_a) {
    var minimumValue = _a.minimumValue, maximumValue = _a.maximumValue, onChangeValue = _a.onChangeValue, customRenderItem = _a.customRenderItem, thumbElement = _a.thumbElement, focusValue = _a.focusValue, _b = _a.visibleItemCount, visibleItemCount = _b === void 0 ? 20 : _b, _c = _a.isReverse, isReverse = _c === void 0 ? false : _c;
    var flatList = useRef(null);
    var _d = useState(0), oneItemHeight = _d[0], setOneItemHeight = _d[1];
    var _e = useState(0), thumbHeight = _e[0], setThumbHeight = _e[1];
    var data = Array.from({ length: maximumValue - minimumValue + visibleItemCount }, function (_, index) { return index + 1; });
    var defaultThumbElement = function (height) { return <View style={StyleSheet.compose(styles.thumb, { top: height })}/>; };
    function onLayout(_a) {
        var nativeEvent = _a.nativeEvent;
        var calculatedWidth = Math.round(nativeEvent.layout.height / visibleItemCount);
        setThumbHeight(nativeEvent.layout.height / 2);
        setOneItemHeight(calculatedWidth);
    }
    function renderItem(element) {
        var index = element.index;
        var style = { height: oneItemHeight }; // Require height
        if (index < (visibleItemCount / 2) - 1 || index > data.length - visibleItemCount + (visibleItemCount / 2) - 1) {
            style = __assign(__assign({}, style), { borderBottomWidth: 0 });
        }
        else if ((index + 1) % (visibleItemCount / 2) === 0 && index + 1 <= maximumValue) {
            style = __assign(__assign({}, style), { width: 40, borderBottomWidth: 3 });
        }
        if (customRenderItem) {
            // Require height
            return customRenderItem(element, style);
        }
        return <DefaultItem style={style}/>;
    }
    function onScroll(event) {
        var value = minimumValue +
            Math.floor(event.nativeEvent.contentOffset.y / oneItemHeight) *
                MULTIPLICITY;
        if (!isReverse) {
            value = maximumValue - value + minimumValue;
        }
        if (value < minimumValue || value > maximumValue) {
            return;
        }
        onChangeValue(value);
    }
    var scrollToElement = useCallback(function (value) {
        flatList.current &&
            flatList.current.scrollToOffset({
                offset: ((value - minimumValue) * oneItemHeight) / MULTIPLICITY,
                animated: false,
            });
    }, [minimumValue, oneItemHeight]);
    useEffect(function () {
        var value = focusValue !== null && focusValue !== void 0 ? focusValue : minimumValue;
        if (!isReverse) {
            value = maximumValue - value + minimumValue;
        }
        if (isReverse ? value <= minimumValue : value >= maximumValue) {
            onChangeValue(minimumValue);
        }
        setTimeout(function () { return scrollToElement(value); }, 0);
    }, [focusValue, maximumValue, minimumValue, scrollToElement, onChangeValue]);
    return (<View style={styles.mainContainer} onLayout={onLayout}>
          <FlatList ref={flatList} style={styles.wrapper} showsVerticalScrollIndicator={false} keyExtractor={function (element, index) { return index.toString(); }} data={data} renderItem={renderItem} onScroll={onScroll} getItemLayout={function (data, index) { return ({
            length: oneItemHeight,
            offset: oneItemHeight * index,
            index: index,
        }); }}/>
          {thumbElement ? thumbElement : defaultThumbElement(thumbHeight)}
      </View>);
}
export default VerticalPicker;
var styles = StyleSheet.create({
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
