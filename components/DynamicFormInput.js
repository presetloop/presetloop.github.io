import { sanitize } from 'dompurify';
import { useState } from 'react';

function DynamicFormInput({ dbName, formData, setFormData, placeholder }) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Update the form data
    const updatedFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      updatedFormData.append(key, sanitize(value));
    }
    updatedFormData.set(dbName, inputValue);

    setFormData(updatedFormData);
    setErrorMessage('');
  };

  return (
    <div className="relative">
      <input
        className="appearance-none border-slate-900 mb-8 border-b-[1px] w-full py-2 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={dbName}
        type="text"
        placeholder={`Add a ${placeholder}`}
        name={dbName}
        value={value}
        onChange={handleFormInputChange}
      />
      {errorMessage && <p className="absolute bottom-[5px] left-0 mb-0 text-red-500 text-md">{errorMessage}</p>}
    </div>
  );
}

export default DynamicFormInput;
