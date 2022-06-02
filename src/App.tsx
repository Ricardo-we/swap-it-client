import React, { createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "bootswatch/dist/zephyr/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
// COMPONENTS
// VIEWS
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import NotFound404 from "./views/NotFound404";
import ProductView from "./views/Home/ProductView";
import UserDashBoardTabs from "./views/UserDashBoard/UserDashBoardTabs";
import Logout from "./views/Login/Logout";
import AdminTabs from "./views/AdminDashboard/AdminTabs";
import ProductPage from "./views/Home/ProductPage";
export const AppContext = createContext({});

// ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
// ;;;;;;;;;;;;;rrrrrrrrrrr;;;;;;;;;;;;;;;;;;;;
// ;;;;;;;;;;;;;r;;;;;;;;;r;;;;;;;;;;;;;;;;;;;;
// ;;;;;;;;;;;;;r;;;;;;;;;r;;;;;;;;;;;;;;;;;;;;
// ;;;;;;;;;;;;;rrrrrrrrrr;;;;;;;;;;;;;;;;;;;;;
// ;;;;;;;;;;;;;r;;;;;r;;;;;;;;;;;;;;;;;;;;;;;;
// ;;;;;;;;;;;;;r;;;;;;r;;;;;;;;;;;;;;;;;;;;;;;
// ;;;;;;;;;;;;;r;;;;;;;r;;;;;;;;;;;;;;;;;;;;;;
// ;;;;;;;;;;;;;r;;;;;;;;r;;;;;;;;;;;;;;;;;;;;;

function App() {
  const [storedUser, setStoredUser] = useLocalStorage("user");

  return (
    <>
      <style>{`
				* {
					box-sizing: border-box;
				}
			`}</style>
      <AppContext.Provider value={{ storedUser, setStoredUser }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/swap-it/admin"
              element={
                storedUser.user?.is_superuser ? (
                  <AdminTabs />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Home />} />
            <Route path="/page/:currentPage" element={<ProductPage />} />
            <Route
              path="/product-details/:product_id"
              element={<ProductView />}
            />
            <Route path="/account" element={<UserDashBoardTabs />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
