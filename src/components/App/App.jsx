import { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // Form states
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [errors, setErrors] = useState({ name: "", imageUrl: "" });

  const isValidImageUrl = (url) =>
    /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(url);

  const isFormValid =
    name.trim() !== "" && isValidImageUrl(imageUrl) && weather !== "";

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddGarmentSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name,
      link: imageUrl,
      weather,
    };
    setClothingItems([newItem, ...clothingItems]);
    setLastAddedItem(newItem);
    console.log("Updated clothingItems:", [newItem, ...clothingItems]);
    closeActiveModal();
    setName("");
    setImageUrl("");
    setWeather("");
  };
  useEffect(() => {
    if (!activeModal) return; // don’t attach if no modal is open

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            weatherData={weatherData}
            clothingItems={clothingItems}
            lastAddedItem={lastAddedItem}
            handleCardClick={handleCardClick}
          />
          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          isSubmitDisabled={!isFormValid}
          onSubmit={handleAddGarmentSubmit}
          name={name}
          setName={setName}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          weather={weather}
          setWeather={setWeather}
          errors={errors}
          setErrors={setErrors}
          isValidImageUrl={isValidImageUrl}
        ></AddItemModal>

        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
