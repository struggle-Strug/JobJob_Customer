import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { message } from "antd";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [customerUser, setCustomerUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const storedLikes = localStorage.getItem("likes");
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes)); // Ensure we parse it as an array
    } else {
      setLikes([]);
      localStorage.setItem("likes", JSON.stringify([]));
    }
    //window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Create a proper logout function that handles all cleanup
  const logout = useCallback((options) => {
    // Clear authentication data
    localStorage.removeItem("token");

    // Reset all user states
    setIsAuthenticated(false);
    setUser(null);
    setCustomer(null);
    setAdmin(null);

    // Show message to user - only if this is not an automatic logout
    if (options?.showMessage !== false) {
      message.error(
        "セッションの有効期限が切れました。再度ログインしてください。"
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        customer,
        setCustomer,
        customerUser,
        setCustomerUser,
        admin,
        setAdmin,
        likes,
        setLikes,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
