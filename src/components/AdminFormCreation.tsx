// AdminFormCreation.tsx
import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addFormField } from '../action';

const AdminFormCreation: React.FC = () => {
  const dispatch = useDispatch();
  const [field, setField] = useState<any>({ type: 'text', label: '', name: '', options: [] });
  const formDetails = useSelector((state: any) => state.form.formDetails);

  const handleAddOption = () => {
    setField({ ...field, options: [...field.options, ''] });
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...field.options];
    updatedOptions.splice(index, 1);
    setField({ ...field, options: updatedOptions });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...field.options];
    updatedOptions[index] = value;
    setField({ ...field, options: updatedOptions });
  };


  const handleAddField = () => {
    dispatch(addFormField(field));
    // Optionally, reset the form field state after adding
    setField({ type: 'text', label: '', name: '', options: [] });
  };

  return (
    <div>
      <h2>Create Form</h2>
      <label htmlFor="fieldType">Field Type:</label>
      <select
        id="fieldType"
        value={field.type}
        onChange={(e) => setField({ ...field, type: e.target.value })}
      >
        <option value="text">Text</option>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio</option>
        <option value="select">Select</option>
      </select>

      <label htmlFor="fieldLabel">Field Label:</label>
      <input
        type="text"
        id="fieldLabel"
        value={field.label}
        onChange={(e) => setField({ ...field, label: e.target.value })}
      />

      <label htmlFor="fieldName">Field Name:</label>
      <input
        type="text"
        id="fieldName"
        value={field.name}
        onChange={(e) => setField({ ...field, name: e.target.value })}
      />

      {['checkbox', 'radio', 'select'].includes(field.type) && (
        <div>
          <h3>{field.type === 'checkbox' ? 'Checkbox' : 'Options'}</h3>
          {field.options.map((option: string, index: number) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveOption(index)}>
                Remove Option
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </div>
      )}

      <button type="button" onClick={handleAddField}>
        Add Field
      </button>

      <div>
        {/* Render all created formDetails fields */}
        {formDetails?.fields?.map((formField: any, index: number) => (
          <div key={index}>
            {/* Render the form field details */}
            Type: {formField.type}, Label: {formField.label}, Name: {formField.name}, Options: {formField?.options}
            {/* Add more details based on your form structure */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFormCreation;
