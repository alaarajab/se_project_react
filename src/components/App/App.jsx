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
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
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

      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        isSubmitDisabled={!isFormValid}
        onSubmit={handleAddGarmentSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
          />
          {errors.name && <span className="modal__error">{errors.name}</span>}
        </label>

        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              if (!isValidImageUrl(e.target.value)) {
                setErrors((prev) => ({
                  ...prev,
                  imageUrl: "This is not a valid image link",
                }));
              } else {
                setErrors((prev) => ({ ...prev, imageUrl: "" }));
              }
            }}
          />
          {errors.imageUrl && (
            <span className="modal__error">{errors.imageUrl}</span>
          )}
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          {["hot", "warm", "cold"].map((type) => (
            <label
              key={type}
              htmlFor={type}
              className="modal__label modal__label_type_radio"
            >
              <input
                id={type}
                type="radio"
                name="weather"
                className="modal__radio-input"
                checked={weather === type}
                onChange={() => setWeather(type)}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </fieldset>
      </ModalWithForm>

      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
