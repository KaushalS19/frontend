// rootReducer.ts
import { combineReducers } from 'redux';
import formReducer from './reducer';

const rootReducer = combineReducers({
  form: formReducer,
  // Add more reducers as needed
});

export default rootReducer;
