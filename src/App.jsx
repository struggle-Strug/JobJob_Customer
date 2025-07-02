import axios from "axios";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import "./index.css";
import { setupAxiosInterceptors } from "./utils/axiosConfig.js";

// Lazy load components

const CompanyLandingPage = lazy(() =>
  import("./Pages/Customer/CompanyLandingPage/index.jsx")
);
const CLLayout = lazy(() => import("./components/CLLayout/index.jsx"));
const CLLogoLayout = lazy(() =>
  import("./components/CLLayout/CLLogoLayout.jsx")
);
const CustomerSignUp = lazy(() =>
  import("./Pages/Customer/CustomerAuth/CustomerSignUp/index.jsx")
);
const CustomerSignIn = lazy(() =>
  import("./Pages/Customer/CustomerAuth/CustomerSignIn/index.jsx")
);
const NotFound = lazy(() => import("./Pages/NotFound/index.jsx"));
const Preparing = lazy(() => import("./Pages/Preparing/index.jsx"));
const Rule = lazy(() => import("./Pages/Customer/Rule/index.jsx"));
const CLMainLayout = lazy(() => import("./components/CLMainLayout/index.jsx"));
const CLTop = lazy(() => import("./Pages/Customer/TopPage/index.jsx"));
const FacilityPage = lazy(() =>
  import("./Pages/Customer/FacilityPage/index.jsx")
);
const FacilityEdit = lazy(() =>
  import("./Pages/Customer/FacilityPage/FacilityEdit.jsx")
);
const JobPostEdit = lazy(() =>
  import("./Pages/Customer/FacilityPage/JobPostEdit.jsx")
);
const Loading = lazy(() => import("./components/Loading/index.jsx"));
const ProcessManagementPage = lazy(() =>
  import("./Pages/Customer/ProcessManagementPage/index.jsx")
);
const PhotoManagement = lazy(() =>
  import("./Pages/Customer/PhotoManagement/index.jsx")
);
const CLMessage = lazy(() => import("./Pages/Customer/Message/index.jsx"));
const CustomerSetting = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage/index.jsx")
);
const MailChange = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage/MailChange.jsx")
);
const PasswordChange = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage/PasswordChange.jsx")
);
const CoporateInformation = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage/CoporateInformation.jsx")
);
const CoporateManagement = lazy(() =>
  import("./Pages/Customer/CustomerSettingPage/CoporateManagement.jsx")
);

const FacilityAdd = lazy(() =>
  import("./Pages/Customer/FacilityPage/FacilityAdd.jsx")
);
const AddJobPost = lazy(() =>
  import("./Pages/Customer/FacilityPage/AddJobPost.jsx")
);
const LinkRequirement = lazy(() => import("./Pages/LinkRequirement/index.jsx"));

function App() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    user,
    setCustomer,
    customer,
    admin,
    setAdmin,
    logout,
  } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { pathname } = useLocation();
  const prefOrFacility = pathname.split("/")[2];
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // Set up axios interceptors once when the component mounts
  useEffect(() => {
    // Pass the logout function to the interceptor
    setupAxiosInterceptors(navigate, setIsAuthenticated, logout);
  }, [navigate, setIsAuthenticated, logout]);

  // Use useCallback to memoize the getUserData function
  const getUserData = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/v1/user/tokenlogin`
      );

      if (res.data?.isAuthError) {
        // This is handled by the interceptor, just return
        return;
      }

      if (res.data.user.type === "member") {
        setUser(res.data.user.data);
        setIsAuthenticated(true);
      } else if (res.data.user.type === "customer") {
        setCustomer(res.data.user.data);
      } else if (res.data.user.type === "admin") {
        setAdmin(res.data.user.data);
      }
    } catch (error) {
      // Error handling is now managed by the axios interceptor
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is updated
    }
  }, [setIsAuthenticated, setUser, setCustomer, setAdmin]);

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      // If no token, ensure user is not authenticated
      logout({
        showMessage: false,
      });
      setIsLoading(false);
    }
  }, [token, getUserData, logout]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/company" element={<CompanyLandingPage />} />
        <Route element={<CLLogoLayout />}>
          <Route path="/customers/new" element={<CustomerSignUp />} />
          <Route path="/customers/sign_in" element={<CustomerSignIn />} />
          <Route path="/customers/rule" element={<Rule />} />
          <Route path="/customers/banner" element={<LinkRequirement />} />
        </Route>
        {token && (customer || admin) ? (
          <>
            <Route element={<CLLayout />}>
              <Route path="/customers" element={<CLMainLayout />}>
                <Route path="/customers" element={<CLTop />} />
                <Route
                  path="/customers/facility/add"
                  element={<FacilityAdd />}
                />
                <Route path="/customers/facility" element={<FacilityPage />} />
                <Route
                  path="/customers/facility/edit/:facility_id"
                  element={<FacilityEdit />}
                />
                <Route
                  path="/customers/jobpost/edit/:jobpost_id"
                  element={<JobPostEdit />}
                />
                <Route
                  path="/customers/jobpost/:facilityId/add"
                  element={<AddJobPost />}
                />
                <Route
                  path="/customers/recruit/edit/"
                  element={<ProcessManagementPage />}
                />
                <Route
                  path="/customers/picture/"
                  element={<PhotoManagement />}
                />
                <Route path="/customers/message" element={<CLMessage />} />
                <Route
                  path="/customers/settings/"
                  element={<CustomerSetting />}
                />
                <Route
                  path="/customers/settings/mail"
                  element={<MailChange />}
                />
                <Route
                  path="/customers/settings/pass"
                  element={<PasswordChange />}
                />
                <Route
                  path="/customers/settings/corporate/"
                  element={<CoporateInformation />}
                />
                <Route
                  path="/customers/settings/user"
                  element={<CoporateManagement />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
              <Route path="/customers/contact" element={<Preparing />} />
            </Route>
          </>
        ) : (
          <Route element={<CLLogoLayout />}>
            <Route path="/*" element={<Navigate to="/customers/sign_in" />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
}

export default App;
