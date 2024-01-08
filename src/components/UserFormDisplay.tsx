// UserFormDisplay.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormDetails, postFormResponse } from '../action';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const UserFormDisplay: React.FC<{ formId: string }> = ({ formId }) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch(); // Use ThunkDispatch
  const formDetails = useSelector((state: any) => state.formDetails);
  const [responses, setResponses] = useState<any>({});

  useEffect(() => {
    dispatch(fetchFormDetails(formId));
  }, [dispatch, formId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(postFormResponse(formId, 'user123', responses)); // Dispatch the thunk action
      // Handle the result if needed
      console.log(result);
    } catch (error) {
      console.error('Error submitting form responses:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setResponses({ ...responses, [field]: { text: value, boolean: false } });
  };

  return (
    <form onSubmit={handleSubmit}>
      {formDetails.fields.map((field: any) => (
        <div key={field.id}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === 'text' ? (
            <input type="text" id={field.name} onChange={(e) => handleChange(field.name, e.target.value)} />
          ) : field.type === 'checkbox' ? (
            field.options.map((option: string, index: number) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`${field.name}_${index}`}
                  onChange={(e) => handleChange(`${field.name}_${index}`, e.target.checked.toString())}
                />
                <label htmlFor={`${field.name}_${index}`}>{option}</label>
              </div>
            ))
          ) : field.type === 'radio' ? (
            field.options.map((option: string, index: number) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`${field.name}_${index}`}
                  name={field.name}
                  onChange={(e) => handleChange(field.name, option)}
                />
                <label htmlFor={`${field.name}_${index}`}>{option}</label>
              </div>
            ))
          ) : field.type === 'select' ? (
            <select id={field.name} onChange={(e) => handleChange(field.name, e.target.value)}>
              {field.options.map((option: string, index: number) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            // Add more field types as needed
            null
          )}
        </div>
      ))}
      <button type="submit">Submit Response</button>
    </form>
  );
};

export default UserFormDisplay;
