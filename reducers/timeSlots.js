const defaultState = [
  {
    startTime: '9 am',
    endTime: '10 am',
    booked: false,
  },
  {
    startTime: '10 am',
    endTime: '11 am',
    booked: false,
  },
  {
    startTime: '11 am',
    endTime: '12 pm',
    booked: false,
  },
  {
    startTime: '12 pm',
    endTime: '1 pm',
    booked: false,
  },
  {
    startTime: '1 pm',
    endTime: '2 pm',
    booked: false,
  },
  {
    startTime: '2 pm',
    endTime: '3 pm',
    booked: false,
  },
  {
    startTime: '3 pm',
    endTime: '4 pm',
    booked: false,
  },
  {
    startTime: '4 pm',
    endTime: '5 pm',
    booked: false,
  },
];

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'EDIT_TIME_SLOT':
      const newState = state;
      newState[action.payload.id] = action.payload.data;
      return newState;
    case 'DELETE_TIME_SLOT':
      const nState = state;
      nState[action.payload.id] = action.payload.data;
      return nState;
    default:
      return state;
  }
};
