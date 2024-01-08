// reducer.ts
import {
  ADD_FORM_FIELD,
  FETCH_FORM_DETAILS,
  FETCH_FORM_RESPONSES,
  POST_FORM_RESPONSE,
} from "./action";

const initialState = {
  formDetails: { fields: [] },
  formResponses: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_FORM_FIELD:
      return {
        ...state,
        formDetails: { fields: [...state.formDetails.fields, action.payload] },
      };

    case FETCH_FORM_DETAILS:
      return { ...state, formDetails: { fields: action.payload } };

    case FETCH_FORM_RESPONSES:
      return { ...state, formResponses: action.payload };

    case POST_FORM_RESPONSE:
      // Optionally update the state or handle the response as needed
      return state;

    default:
      return state;
  }
};

export default reducer;
