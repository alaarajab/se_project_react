import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Profile from "../Profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/api";
import * as auth from "../../utils/auth";
import { getToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");
  const closeActiveModal = () => setActiveModal("");

  const handleAddItem = (values) => {
    if (!loggedIn) return;
    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.type,
    };
    const token = getToken();
    addItem(newItem, token)
      .then((savedItem) => {
        setClothingItems([savedItem, ...clothingItems]);
        setLastAddedItem(savedItem);
        closeActiveModal();
      })
      .catch((err) => console.error("Failed to add item:", err));
  };

  const handleDeleteItem = (id) => {
    if (!loggedIn) return;
    const token = getToken();
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        if (selectedCard._id === id) setSelectedCard({});
      })
      .catch((err) => console.error("Failed to delete item:", err));
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") closeActiveModal();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(data))
      .catch(console.error);
  }, []);

  // ------------------------
  // AUTH HANDLERS
  // ------------------------

  const handleRegister = async (data) => {
    try {
      // 1️⃣ Send registration request
      await auth.register({
        name: data.name, // frontend uses `username`, backend expects `name`
        email: data.email,
        password: data.password,
        avatar: data.avatar || "",
      });

      // 2️⃣ Auto-login immediately after registration to get token
      const res = await auth.login({
        email: data.email,
        password: data.password,
      });

      // 3️⃣ Fetch current user info from /users/me now that token exists
      const user = await auth.checkToken(); // ✅ token is valid after login

      setLoggedIn(true);
      setCurrentUser(user);
      closeActiveModal();
    } catch (err) {
      console.error("Registration failed:", err);
      let message = "Registration failed. Please try again.";
      if (err.message) message = err.message;
      alert(message);
    }
  };

  const handleLogin = async (data) => {
    try {
      // 1️⃣ Send login request
      const res = await auth.login({
        email: data.email,
        password: data.password,
      });

      // 2️⃣ Fetch current user info
      const user = await auth.checkToken(); // ✅ token must exist in localStorage

      setLoggedIn(true);
      setCurrentUser(user);
      closeActiveModal();
    } catch (err) {
      console.error("Login failed:", err);
      let message = "Login failed. Please check your credentials.";
      if (err.message) message = err.message;
      alert(message);
    }
  };

  // ------------------------
  // AUTO LOGIN on page load
  // ------------------------
  useEffect(() => {
    const token = getToken();
    if (token) {
      auth
        .checkToken()
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
        })
        .catch(() => auth.logout());
    }
  }, []);

  const handleUpdateUser = async (data) => {
    const token = getToken();
    try {
      const updatedUser = await auth.updateUser(data, token); // call API
      setCurrentUser(updatedUser); // update state
      setIsEditProfileOpen(false); // ✅ close modal after update
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
              handleLogout={() => {
                auth.logout();
                setLoggedIn(false);
                setCurrentUser(null);
              }}
              weatherData={weatherData}
              loggedIn={loggedIn}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    lastAddedItem={lastAddedItem}
                    onCardClick={handleCardClick}
                    onDeleteItem={handleDeleteItem}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddNewClick={handleAddClick}
                      onUpdateUser={handleUpdateUser}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={handleAddItem}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={handleDeleteItem}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
          />
          {/* ✅ Edit Profile Modal */}
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            onUpdateUser={handleUpdateUser}
            currentUser={currentUser}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
