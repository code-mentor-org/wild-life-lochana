import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Bookings from "./pages/Bookings";
import Favourites from "./pages/Favourites";
import Layout from "./components/Layout";
import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-toastify/dist/ReactToastify.css";
import Property from "./pages/Property";
import UserDetailContext from "./context/userDetailContext";
import Profile from "./pages/Profile";
import Information from "./pages/Information";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div> Loading data... </div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/collection">
                  <Route index element={<Collection />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>{" "}
                <Route path="/information" element={<Information />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* ADMIN */}
              <Route path="/admin">
			  	<Route index element={<AdminLogin />} />
				<Route path="dashboard" element={<Dashboard/>} />
				<Route path="properties" element={<div>Admin Properties</div>} />
			  </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}
