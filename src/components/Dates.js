// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import type Moment from 'moment';
import Date from './Date';

type Props = {
  // Currently active date index
  currentDateIndex: ?number,
  // Array of dates to render
  dates: Array<Moment>,
  // Callback to handle date select
  onSelectDay: (index: number) => void,
  // Callback to handle date render
  onRenderDay: (index: number, width: number) => void,
}

export default class Dates extends PureComponent<Props> {
  render() {
    const {
      currentDateIndex,
      dates,
      onSelectDay,
      onRenderDay,
    } = this.props;
    return (
      <View style={styles.container}>
        {dates.map((date, index) =>
          <View key={index}>
            <Date
              date={date}
              index={index}
              isActive={index === currentDateIndex}
              onPress={onSelectDay}
              onRender={onRenderDay}
              key={index}
            />
          </View>
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
