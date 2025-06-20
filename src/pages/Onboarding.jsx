import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    generation: '',
    style: '',
    music: '',
    friendship: '',
    food: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  // Save form to localStorage
  localStorage.setItem("connectifyUser", JSON.stringify(form));

  // Redirect to dashboard
  navigate("/dashboard");
};

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Onboarding Questions</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Generation:
          <select name="generation" className="w-full border p-2 rounded" onChange={handleChange} required>
            <option value="">Select...</option>
            <option>Gen Z</option>
            <option>Millennial</option>
            <option>Boomer</option>
          </select>
        </label>

        <label>
          Style:
          <select name="style" className="w-full border p-2 rounded" onChange={handleChange} required>
            <option value="">Select...</option>
            <option>Chaotic Creativity</option>
            <option>Structured Planning</option>
          </select>
        </label>

        <label>
          Music Interest:
          <input type="text" name="music" className="w-full border p-2 rounded" onChange={handleChange} required />
        </label>

        <label>
          Friendship Style:
          <select name="friendship" className="w-full border p-2 rounded" onChange={handleChange} required>
            <option value="">Select...</option>
            <option>Deep Conversations</option>
            <option>Shared Activities</option>
            <option>Just Talking</option>
          </select>
        </label>

        <label>
          Comfort Food:
          <input type="text" name="food" className="w-full border p-2 rounded" onChange={handleChange} required />
        </label>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Onboarding;
