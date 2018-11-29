import AppDispatcher from './AppDispatcher';
import EventEmitter from 'events';

import uniqueId from 'lodash/uniqueId';


let items = [
  { value: 'Pants', id: uniqueId(), packed: false },
  { value: 'Jacket', id: uniqueId(), packed: false },
  { value: 'iPhone Charger', id: uniqueId(), packed: false },
  { value: 'MacBook', id: uniqueId(), packed: false },
  { value: 'Sleeping Pills', id: uniqueId(), packed: true },
  { value: 'Underwear', id: uniqueId(), packed: false },
  { value: 'Hat', id: uniqueId(), packed: false },
  { value: 'T-Shirts', id: uniqueId(), packed: false },
  { value: 'Belt', id: uniqueId(), packed: false },
  { value: 'Passport', id: uniqueId(), packed: true },
  { value: 'Sandwich', id: uniqueId(), packed: true },
];

class ItemStore extends EventEmitter {
	constructor() {
		super();
		AppDispatcher.register((action)=> {
			switch (action.type) {
				case 'ADD_NEW_ITEM':
					return this.addItem(action.item);
				
				case 'REMOVE_ITEM':
					return this.removeItem(action.item);
				
				case 'UPDATE_ITEM':
					return this.updateItem(action.item);
				default:
					break;
			}
		});
	}
	getItems() {
		return items;
	}
	addItem(item) {
		items = [...items, item];
		this.emit('change');
	}
	updateItem(updatedItem) {
		items = items.map(item => {
			if (item.id !== updatedItem.id) {
				return item;
			}
			return updatedItem;
		})
		this.emit('change');
	}
	removeItem(itemToRemove) {
		items = items.filter(item => item.id !== itemToRemove.id);
		this.emit('change');
	}
}
export default new ItemStore();