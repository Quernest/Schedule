// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import moment from 'moment';
import type Moment from 'moment';
import humanizeDuration from 'humanize-duration';
import {
  splitStringWhiteSpace,
  timeFormatWithoutSeconds,
  timeFormat,
  isSameDay,
} from '../helpers/helpers';

const formatTime = (value: string): string => {
  return moment(value, timeFormat).format(timeFormatWithoutSeconds);
};

type Props = {
  isActive: boolean,
  selectedDate: Moment,
  currentTime: Moment,
  start: string,
  end: string,
};

type State = {
  currentTime: Moment,
};

export default class Time extends Component<Props, State> {
  willBegin = (): boolean => {
    const {
      selectedDate,
      currentTime,
      start,
    } = this.props;

    // 'ru' hardcore, should be i18n language
    const { minutes } = this.calculate(start, 'uk');

    if (typeof minutes !== 'undefined') {
      // if there are 20 minutes left before event begins
      return (minutes >= 0 && minutes <= 20) && isSameDay(currentTime, selectedDate);
    }

    return false;
  };

  calculate = (time: string, language: string): Object => {
    const { currentTime } = this.props;

    const ms = moment(time, timeFormat).diff(currentTime);
    const duration = moment.duration(ms);
    const hours = duration.hours();
    const minutes = (hours * 60) + duration.minutes();

    if (duration && (typeof hours !== 'undefined' || typeof minutes !== 'undefined')) {
      return {
        hours,
        minutes,
        humanized: humanizeDuration(duration, {
          language,
          round: true,
          // displayed units
          // m - minutes
          // s - seconds
          units: [minutes === 0 ? 's' : 'm'],
        }),
      };
    }

    return {};
  };

  render() {
    const {
      start,
      end,
      isActive,
    } = this.props;

    if (!isActive && !this.willBegin()) {
      return (
        <View style={styles.wrap}>
          <Text style={styles.time}>
            {formatTime(start)}
          </Text>
          <Text style={[styles.time, styles.timeEnd]}>
            {formatTime(end)}
          </Text>
        </View>
      );
    }

    if (!isActive && this.willBegin()) {
      const [time, label] = splitStringWhiteSpace(this.calculate(start, 'uk').humanized);

      return (
        <View style={styles.wrap}>
          <Text style={styles.label}>
            до початку
          </Text>
          <Text style={styles.time}>
            {time}
          </Text>
          <Text style={styles.label}>
            {label}
          </Text>
        </View>
      );
    }

    if (isActive) {
      const [time, label] = splitStringWhiteSpace(this.calculate(end, 'uk').humanized);

      return (
        <View style={styles.wrap}>
          <Text style={styles.label}>
            до кінця
          </Text>
          <Text style={styles.time}>
            {time}
          </Text>
          <Text style={styles.label}>
            {label}
          </Text>
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({
  wrap: {
    borderRightWidth: 1,
    borderRightColor: '#dfe4ea',
    padding: 10,
  },
  time: {
    fontFamily: 'Muli-Regular',
    textAlign: 'center',
    fontSize: 18,
    color: '#343434',
  },
  timeEnd: {
    color: '#747d8c',
  },
  label: {
    fontFamily: 'Muli-Regular',
    textAlign: 'center',
    fontSize: 10,
    color: '#747d8c',
  },
});
