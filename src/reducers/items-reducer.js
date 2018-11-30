import { ADD_NEW_ITEM, REMOVE_ITEM, TOGGLE_ITEM, MARK_ALL_AS_UNPACKED, UNDO_ITEM_ACTION, REDO_ITEM_ACTION } from '../constants';

export default function(state = {}, action) {
  const { past, present, future } = state;

  if (action.type === ADD_NEW_ITEM) {
    const { id, packed, value } = action;
    return {
      present: [ ...present, { id, packed, value } ],
      past: [present, ...past],
      future
    };
  }

  if (action.type === REMOVE_ITEM) {
      return {
      present: present.filter(item => item.id !== action.id),
      past: [present, ...past],
      future
    };
  }

  if (action.type === TOGGLE_ITEM) {
    return {
      present: present.map(item => {
      if (item.id === action.id) return { ...item, packed: !item.packed  };
        return item;
      }),
      past: [present, ...past],
      future
    };
    return 
  }

  if (action.type === MARK_ALL_AS_UNPACKED) {
    return {
      present: present.map(item => {
        return { ...item, packed: false  };
      }),
      past: [present, ...past],
      future
    };
  }

  if (action.type === UNDO_ITEM_ACTION) {
    if (!past.length) {
      return state;
    }
    const newFuture = [present, ...future];
    const [ newPresent, ...newPast ] = past;
    return {
      past: newPast,
      present: newPresent,
      future: newFuture
    }
  }

  if (action.type === REDO_ITEM_ACTION) {
    if (!future.length) {
      return state;
    }
    const [ newPresent, ...newFuture ] = future;
    const newPast = [present, ...past];
    return {
      past: newPast,
      present: newPresent,
      future: newFuture
    }
  }

  return state;
}
