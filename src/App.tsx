import axios from "axios";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { API_URL } from "./http";
import { ChatPage } from "./pages/ChatPage/ChatPage";
import { StartPage } from "./pages/StartPage/StartPage";

const App = (): JSX.Element => {
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
    } catch (e: any) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) checkAuth();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/chats/:userId" element={<ChatPage />} />
      </Routes>
    </>
  );
};

export default App;
