import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Card from "./components/Card";
import Header from "./components/Header";
import axios from "axios";
import Hero from "./components/Hero";
import Sale from "./components/Sale";
import Footer from "./components/Footer";
import CardSpa from "./components/CardSpa";
import Drawer from "./components/Drawer";
import Register from "./components/Register";
import AppContext from "./context";
import Login from "./components/Login/Login";

const arr = [
  {
    id: 1,
    title: "СПА & Mассаж",
    p: "Максимальное раслабление",
    imageUrl: "/img/massage.jpeg",
  },
  {
    id: 2,
    title: "Ногтевой сервис",
    p: "Мастерство ногтевого сервиса",
    imageUrl: "/img/nail.jpeg",
  },
  {
    id: 3,
    title: "Услуги парикмахера",
    p: "Учтем ваши предпочтения",
    imageUrl: "/img/hair.jpeg",
  },
];

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [regOpened, setRegOpened] = useState(true);
  const [openCardSpa, setOpenCardSpa] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [currentItems, setCurrentItems] = React.useState([]);
  const [selectCard, setSelectCard] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get(
          "https://6559ddb66981238d054ce846.mockapi.io/items"
        );
        const cartResponse = await axios.get(
          "https://6559ddb66981238d054ce846.mockapi.io/cart"
        );

        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleCloseRegister = () => {
    setRegOpened(false);
  };

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        await axios.delete(
          `https://6559ddb66981238d054ce846.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        await axios.post(
          "https://6559ddb66981238d054ce846.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6559ddb66981238d054ce846.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCardClick = (id) => {
    setOpenCardSpa((prev) => {
      const selectedData = items.find((item) => item.dospaId === id);
      if (selectCard === id) {
        return !prev;
      } else if (selectedData) {
        setCurrentItems(selectedData.data);
        setSelectCard(id);
        return true;
      } else {
        setSelectCard(null);
        return prev;
      }
    });
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppContext.Provider
      value={{ items, cartItems, setCartOpened, setCartItems }}
    >
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {cartOpened && (
                  <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                  />
                )}
                {regOpened && (
                  <Register onCloseReg={() => setRegOpened(false)} />
                )}
                <Header
                  onClickCart={() => setCartOpened(true)}
                  onClickReg={() => setRegOpened(true)}
                />
                <Hero />
                <div className="cards pr-50 pl-50 pb-30">
                  <div className="d-flex justify-between">
                    {arr.map((obj) => (
                      <Card
                        id={obj.id}
                        key={obj.id}
                        title={obj.title}
                        p={obj.p}
                        imageUrl={obj.imageUrl}
                        onClickPrice={handleCardClick}
                      />
                    ))}
                  </div>
                </div>
                {openCardSpa && (
                  <div className="">
                    <div className="d-flex justify-between align-center pl-50 pr-50 pt-20">
                      <h3>
                        {searchValue
                          ? `Поиск по запросу: "${searchValue}"`
                          : "Услуги"}{" "}
                      </h3>
                      <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="search" />
                        {searchValue && (
                          <img
                            onClick={() => setSearchValue("")}
                            src="/img/x.svg"
                            alt="x"
                            className="cu-p clear"
                          />
                        )}
                        <input
                          onChange={onChangeSearchInput}
                          value={searchValue}
                          placeholder="Поиск..."
                        />
                      </div>
                    </div>
                    {currentItems.length > 0 && (
                      <div id="items" key="items">
                        {currentItems
                          .filter((item) =>
                            item.title
                              .toLowerCase()
                              .includes(searchValue.toLowerCase())
                          )
                          .map((item, index) => (
                            <CardSpa
                              key={index}
                              title={item.title}
                              p={item.p}
                              price={item.price}
                              onPlus={() => onAddToCart(item)}
                              added={cartItems.some(
                                (obj) => Number(obj.id) === Number(item.id)
                              )}
                            />
                          ))}
                      </div>
                    )}
                  </div>
                )}
                <Sale />
                <Footer />
              </>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login onCloseLogin={() => setRegOpened(false)} />}
          />
          {regOpened && (
            <Route
              path="/register"
              element={<Register onCloseReg={() => setRegOpened(false)} />}
            />
          )}
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
