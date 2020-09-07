export const EditTimeSlot = (id, data) => async (dispatch) => {
  dispatch({
    type: 'EDIT_TIME_SLOT',
    payload: { id, data },
  });
};

export const DeleteTimeSlot = (id, data) => async (dispatch) => {
  dispatch({
    type: 'DELETE_TIME_SLOT',
    payload: { id, data },
  });
};
