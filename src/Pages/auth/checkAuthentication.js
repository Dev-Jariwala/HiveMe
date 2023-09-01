import axios from "axios";

const checkAuthentication = async () => {
  try {
    const { authenticated, user } = await axios.get(
      `http://localhost:5000/auth/authenticate`,

      {
        withCredentials: true,
      }
    );
    console.log(authenticated);
    return authenticated; // true or false
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

export default checkAuthentication;
