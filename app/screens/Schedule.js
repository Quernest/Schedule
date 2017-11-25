import React, { PureComponent } from 'react';

import { 
  Font,
  Constants
} from 'expo';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

import moment from 'moment';
import ru from 'moment/locale/ru';
moment.locale('ru');

import {
  filterEvents
} from '../helpers/helpers';

import Calendar from '../components/Calendar';
import Events from '../components/Events';

class Schedule extends PureComponent {
  static navigationOptions = {
    title: 'Second Screen',
    header: null
  };

  state = {
    isFontsLoaded: false,
    events: filterEvents(moment()),
    selectedDate: moment(),
  };

  async componentDidMount() {
    await Font.loadAsync({
      'RobotoCondensed-Regular': require('../../assets/fonts/RobotoCondensed-Regular.ttf'),
      'RobotoCondensed-Bold': require('../../assets/fonts/RobotoCondensed-Bold.ttf'),
      'RobotoCondensed-Light': require('../../assets/fonts/RobotoCondensed-Light.ttf')
    }).then(() => this.setState({ isFontsLoaded: true }))
  }

  onSelectDate = (date) => {
    this.setState({
      events: filterEvents(date),
      selectedDate: date
    });
  };

  render() {
    const { isFontsLoaded, events, selectedDate } = this.state;
    const { navigate } = this.props.navigation;

    return (
      isFontsLoaded && <View style={styles.container}>
        <StatusBar hidden={true} />
        <Calendar
          showDaysAfterCurrent={13}
          onSelectDate={this.onSelectDate} 
        />
        <Events
          events={events}
          navigate={navigate}
          selectedDate={selectedDate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F53B1'
  },
});

export default Schedule;