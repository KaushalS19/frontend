// actions.ts
import axios from "axios";

export const ADD_FORM_FIELD = "ADD_FORM_FIELD";
export const FETCH_FORM_DETAILS = "FETCH_FORM_DETAILS";
export const FETCH_FORM_RESPONSES = "FETCH_FORM_RESPONSES";
export const POST_FORM_RESPONSE = "POST_FORM_RESPONSE";

export const addFormField = (field: any) => ({
  type: ADD_FORM_FIELD,
  payload: field,
});

export const fetchFormDetails = (formId: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`/forms/${formId}/details`);
    dispatch({
      type: FETCH_FORM_DETAILS,
      payload: response.data.fields,
    });
  } catch (error) {
    console.error("Error fetching form details:", error);
  }
};

export const fetchFormResponses = (formId: string) => async (dispatch: any) => {
  try {
    const response = await axios.get(`/forms/${formId}/responses`);
    dispatch({
      type: FETCH_FORM_RESPONSES,
      payload: response.data.responses,
    });
  } catch (error) {
    console.error("Error fetching form responses:", error);
  }
};

export const postFormResponse =
  (formId: string, userId: string, responses: any) => async (dispatch: any) => {
    try {
      const response = await axios.post("/form-response", {
        formId,
        userId,
        responses,
      });
      dispatch({
        type: POST_FORM_RESPONSE,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error posting form response:", error);
    }
  };
