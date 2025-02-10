import { useState } from "react";
import WelcomePage from "./components/WelcomePage";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import io from "socket.io-client";

const socket = io("ws://localhost:4000");

function App() {

  const [pseudo, SetPseudo] = useState();
  const [isPseudoPage, SetIsPseudoPage] = useState(true);

  return (
    <div className="h-screen box-border">
      <Header />
    {isPseudoPage ?
      <WelcomePage SetPseudo={SetPseudo} SetIsPseudoPage={SetIsPseudoPage} /> :
      <HomePage pseudo={pseudo}  socket={socket} />
    
  }
  </div>
  );
}

export default App;
