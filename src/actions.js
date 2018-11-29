import AppDispatcher from './AppDispatcher';
import uniqueId from 'lodash/uniqueId';

export const addItem = (item) => {
	AppDispatcher.dispatch({ 
		type: 'ADD_NEW_ITEM', 
		item: { value: item, packed: false, id: uniqueId() } 
	});
}

export const removeItem = (item) => {
	AppDispatcher.dispatch({
		type: 'REMOVE_ITEM',
		item
	});
}

export const toggleItem = (item) => {
	AppDispatcher.dispatch({
		type: 'UPDATE_ITEM',
		item: { ...item, packed: !item.packed}
	});
}
