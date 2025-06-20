import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Connect Before You Meet, Thrive When You Greet!
      </h2>
      <p className="text-gray-600 mb-6">
        Your AI-powered pre-event networking buddy.
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        onClick={() => navigate("/onboarding")} // or "/onboarding" if onboarding comes first
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
