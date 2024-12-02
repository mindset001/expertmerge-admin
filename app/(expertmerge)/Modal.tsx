import { editPassword } from '@/app/api/services/endpoints/admin';
import ExpertButton from '@/components/buttons/ExpertButton';
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import 'antd/dist/reset.css';

interface FormData {
  password: string;
}

const EditPassword = () => {
  const [formData, setFormData] = useState<FormData>({ password: '' });
  const [email, setEmail] = useState<string>(''); // Separate state for email
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [adminDetails, setAdminDetails] = useState<{ email?: string }>({});

  useEffect(() => {
    try {
      const storedDetails = localStorage.getItem("adminDetails");
      if (storedDetails) {
        setAdminDetails(JSON.parse(storedDetails));
      }
    } catch (error) {
      console.error("Error parsing adminDetails from localStorage:", error);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate inputs
    let validationErrors: { email?: string; password?: string } = {};

    if (!email) validationErrors.email = "Email Address is required";
    else if (email !== adminDetails.email) validationErrors.email = "Email does not match the logged-in admin's email";

    if (!formData.password) validationErrors.password = "Current Password is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Call the editPassword function with form data
    const { response, error } = await editPassword(formData);

    if (response) {
      setSuccessModalVisible(true); // Show success modal
      setFormData({ password: '' });
      setEmail(''); // Clear email input
    } else if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full flex flex-col items-center border rounded-lg p-6 mb-6">
        <div className="w-full flex justify-between mt-6">
          {/* Email Input */}
          <div>
            <p className="text-[#101928] text-[14px] font-[500]">
              Email Address <span className="text-[#FF0000]">*</span>
            </p>
            <input
              name="email"
              value={email}
              onChange={handleChange}
              className="border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px] p-2"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <p className="text-[#101928] text-[14px] font-[500]">
              Enter Current Password <span className="text-[#FF0000]">*</span>
            </p>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-[#D0D5DD] rounded-[6px] h-[56px] w-[340px] p-2"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
        </div>
      </div>

      {/* Display Error Message */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <ExpertButton text="Submit" onClick={handleSubmit} />

      {/* Success Modal */}
      <Modal
        title="Success"
        visible={successModalVisible}
        footer={null}
        onCancel={() => setSuccessModalVisible(false)}
      >
        <p>Password updated successfully!</p>
      </Modal>
    </form>
  );
};

export default EditPassword;
