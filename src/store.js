import { configureStore } from '@reduxjs/toolkit';
import throttle from 'lodash/throttle';
import { updateLocalStorage, LOCALSTORAGE_KEYS } from './client/localstorage-client';
import filterReducer, { loadState as loadFilterState } from './reducer/filters';
import userReducer, { loadState as loadUserState } from './reducer/userData';
import settingsReducer, { loadState as loadSettingsState } from './reducer/settings';
import tasksReducer, { loadState as loadTasksState } from './reducer/tasks';
import tempReducer, { loadState as loadTempState } from './reducer/temp';
import unlocksReducer, { loadState as loadUnlocksState } from './reducer/unlocks';

const reducer = {
    filters: filterReducer,
    user: userReducer,
    settings: settingsReducer,
    tasks: tasksReducer,
    unlocks: unlocksReducer,
    temp: tempReducer,
};

const preloadedState = {
    filters: loadFilterState(),
    user: loadUserState(),
    settings: loadSettingsState(),
    tasks: loadTasksState(),
    unlocks: loadUnlocksState(),
    temp: loadTempState(),
};

const store = configureStore({
    reducer,
    preloadedState,
});

store.subscribe(
    throttle(() => {
        updateLocalStorage(LOCALSTORAGE_KEYS.FILTER_STATE, store.getState().filters);
        updateLocalStorage(LOCALSTORAGE_KEYS.USER_DATA, store.getState().user);
        updateLocalStorage(LOCALSTORAGE_KEYS.SETTINGS, store.getState().settings);
        updateLocalStorage(LOCALSTORAGE_KEYS.TASKS, store.getState().tasks);
        updateLocalStorage(LOCALSTORAGE_KEYS.UNLOCKS, store.getState().unlocks);
    }, 200)
);

export default store;