import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4 bg-gray-50">
      <div className="p-6 rounded-xl shadow-md bg-white max-w-md w-full flex flex-col items-center gap-4">
        <Ghost className="w-16 h-16 text-gray-400" />
        <h1 className="text-4xl font-bold text-gray-800">404 - Not Found</h1>
        <p className="text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/dashboard">
          <Button className="bg-green-500 hover:bg-green-600 mt-4">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
