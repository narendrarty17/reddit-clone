import { Close } from "./utils/svgComponents/GloalSvgs";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

import Google from "../assets/imgs/Login/google.jpg";

const Login = ({ handleClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { uid: googleId, displayName: name, email, photoURL } = result.user;

      const user = {
        googleId,
        name,
        email,
        photoURL,
      };

      dispatch(authActions.login(user));

      console.log("User details: ", user);

      // Handle successful login (e.g., redirect or update UI)
      setUserDetails(user);
    } catch (error) {
      console.log("Error signing in: ", error);
      alert("Error in signing in");
    }
  };

  useEffect(() => {
    handleClose();
  }, [userDetails, handleClose]);

  return (
    <div className="fixed inset-0 z-20 mx-4 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col gap-10 bg-darkGray w-full max-w-lg px-12 py-8 text-white rounded-xl shadow-lg relative">
        {/* Close Button */}
        <div>
          <button
            className="absolute top-3 right-3 hover:text-gray-200"
            onClick={() => {}}
          >
            <Close handleClose={handleClose} />
          </button>
          <h2 className="text-2xl font-bold mb-3 text-left">Login</h2>

          <p className="text-white mb-6">
            By Continuing, you agree to our{" "}
            <span className="text-blue-500">User Agreement</span> and
            acknowledge that you understand the{" "}
            <span className="text-blue-500">Privacy Policy</span>.
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex gap-10 justify-center items-center font-semibold h-[50px] w-full rounded-3xl bg-white text-black"
        >
          <img src={Google} className="w-6 h-6" alt="google icon" />
          <p>Continue with Google</p>
        </button>
      </div>
    </div>
  );
};

export default Login;
