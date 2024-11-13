import react, { useEffect } from "react" // Add useEffect import
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Search from "./pages/Search"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Base from "./components/Base"
import { AuthProvider, useAuth } from './components/AuthContext'; // Import useAuth

function Logout() {
  const { logout } = useAuth(); // Get logout function from AuthContext
  useEffect(() => {
    logout(); // Call logout on component mount
  }, [logout]);
  return <Navigate to="/" />;
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Base>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterAndLogout />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Base>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
