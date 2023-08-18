import React from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';

interface DefaultItemProps {
  style: ViewStyle;
}

function DefaultItem({ style }: DefaultItemProps) {
  return <View style={StyleSheet.compose(styles.block, style)} />;
}

export default DefaultItem;

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderColor: '#979797',
    width: 30,
    borderBottomWidth: 1,
  },
});
