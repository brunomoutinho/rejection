import { createStore } from 'redux';
import { reducer } from './index.js';
import { getSavedState, saveState } from '../storage/index.js';
import throttle from 'lodash/throttle';

let store;

export const configure = () => {
	if (!store) {
		const savedState = getSavedState();
		store = createStore(reducer, savedState);
		store.subscribe(throttle(() => saveState(store.getState()), 1000));
	}

	return store;
};
