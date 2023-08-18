import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import { ListRenderItemInfo } from '@react-native/virtualized-lists/Lists/VirtualizedList';
interface VerticalPickerProps {
    minimumValue: number;
    maximumValue: number;
    onChangeValue: (value: number) => void;
    customRenderItem?: (element: ListRenderItemInfo<number>, style: ViewStyle) => ReactElement;
    thumbElement?: ReactElement;
    focusValue?: number;
    visibleItemCount?: number;
    isReverse?: boolean;
}
declare function VerticalPicker({ minimumValue, maximumValue, onChangeValue, customRenderItem, thumbElement, focusValue, visibleItemCount, isReverse, }: VerticalPickerProps): React.JSX.Element;
export default VerticalPicker;
