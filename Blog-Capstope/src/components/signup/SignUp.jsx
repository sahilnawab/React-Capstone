import { useState } from 'react';
import Button from '../reusableComponents/Button';
import Input from '../reusableComponents/Input';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/authSlice';
import authServiceInstance from '../../appwrite/auth';

function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    console.log("Data before sending to createAccount:", data);
    
    setError("");
    try {
        const userData = await authServiceInstance.createAccount(data);
        console.log("User data returned:", userData);

        if (userData) {
            const currentUser = await authServiceInstance.getCurrentUser();
            console.log("Current user data:", currentUser);
            if (currentUser) dispatch(login(currentUser));
            navigate("/");
        }
    } catch (error) {
        console.log("Error occurred during sign-up:", error);
        setError(error.message);
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-slate-200 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter your Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", { required: true, minLength: 3 })}
            />
            {/* {errors.name && <p className="text-red-500 text-sm">Name is required and should be at least 3 characters long.</p>} */}
          </div>
          <div className="mb-4">
          <Input
                                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
            {/* {errors.email && <p className="text-red-500 text-sm">A valid email is required.</p>} */}
          </div>
          <div className="mb-6">
            <Input
              type="password"
              placeholder="Enter Your Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", { required: true, minLength: 6, maxLength: 20 })}
            />
            {/* {errors.password && <p className="text-red-500 text-sm">Password is required and should be between 6 and 20 characters long.</p>} */}
              
          </div>
          <div className='m-3 flex justify-center'>
            <small>Already Have An Account? <Link to="/login">Click here</Link></small>
          </div>
          <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
