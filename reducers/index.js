import { combineReducers } from 'redux';
import TimeSlots from './timeSlots';

export default combineReducers({
  Slots: TimeSlots,
});
