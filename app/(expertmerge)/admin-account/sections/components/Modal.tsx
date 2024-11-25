import { createAdmin } from '@/app/api/services/endpoints/admin';
import ExpertButton from '@/components/buttons/ExpertButton';
import React, { useState } from 'react';
import { Modal } from 'antd'; // Import Ant Design Modal
import 'antd/dist/reset.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const CreateAccountForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate inputs
    let validationErrors: Partial<FormData> = {};
    if (!formData.firstName) validationErrors.firstName = "First Name is required";
    if (!formData.lastName) validationErrors.lastName = "Last Name is required";
    if (!formData.email) validationErrors.email = "Email Address is required";
    if (!formData.role) validationErrors.role = "Role selection is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Call the createAdmin function with form data
    const { response, error } = await createAdmin(formData);

    if (response) {
      setSuccessModalVisible(true); // Show success modal
      setFormData({ firstName: '', lastName: '', email: '', role: '' });
      // setTimeout(() => {
      //   setSuccessModalVisible(true); // Hide modal after 3 seconds
      //   window.location.reload(); // Reload the page
      // }, 2000);
    } else if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='w-full flex flex-col items-center border rounded-lg p-6 mb-6'>
        <div className='w-full flex justify-between'>
          <div>
            <p className='text-[#101928] text-[14px] font-[500]'>First Name <span className='text-[#FF0000]'>*</span></p>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className='border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px] p-2'
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <p className='text-[#101928] text-[14px] font-[500]'>Last Name <span className='text-[#FF0000]'>*</span></p>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className='border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px] p-2'
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className='w-full flex justify-between mt-6'>
          <div>
            <p className='text-[#101928] text-[14px] font-[500]'>Email Address <span className='text-[#FF0000]'>*</span></p>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px] p-2'
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <p className='text-[#101928] text-[14px] font-[500]'>Select Role <span className='text-[#FF0000]'>*</span></p>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className='border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px] p-2'
            >
              <option value="">Select a role</option>
              <option value="admin">Support Admin</option>
              <option value="account">Account Manager</option>
              <option value="content">Content Manager</option>
              <option value="data">Data Manager</option>
            </select>
            {errors.role && <p className="text-red-500">{errors.role}</p>}
          </div>
        </div>
      </div>

      {/* Display error message */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <ExpertButton text="Create Account" onClick={handleSubmit} />

      {/* Success Modal */}
      <Modal
        title="Success"
        visible={successModalVisible}
        footer={null}
        onCancel={() => setSuccessModalVisible(false)}
      >
        <p>Admin account created successfully!</p>
      </Modal>
    </form>
  );
};

export default CreateAccountForm;
