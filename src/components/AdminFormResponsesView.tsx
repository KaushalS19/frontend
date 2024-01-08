// AdminFormResponsesView.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormDetails, fetchFormResponses } from '../action';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const AdminFormResponsesView: React.FC<{ formId: string }> = ({ formId }) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const formDetails = useSelector((state: any) => state.formDetails);
  const formResponses = useSelector((state: any) => state.formResponses);

  useEffect(() => {
    dispatch(fetchFormDetails(formId));
    dispatch(fetchFormResponses(formId));
  }, [dispatch, formId]);

  return (
    <div>
      <h2>Form Responses</h2>
      <h3>Form Details</h3>
      <ul>
        {formDetails.fields.map((field: any) => (
          <li key={field.id}>{field.label}</li>
        ))}
      </ul>

      <h3>Responses</h3>
      <ul>
        {formResponses.map((response: any, index: number) => (
          <li key={index}>
            {Object.keys(response).map((field) => (
              <div key={field}>
                <strong>{field}:</strong> {response[field]}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminFormResponsesView;
