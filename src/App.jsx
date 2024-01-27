import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AndarBahar from "./Component/Home/Games/Andar&Bahar/AndarBahar";
import App1 from "./App1";
import DragonTesting from "./Component/Home/Games/DragonTesting";
import DragonTiger from "./Component/Home/Games/DragonTiger";
import DragonTigerLion from "./Component/Home/Games/DragonTigerLion/DragonTigerLion";
import Hicard from "./Component/Home/Games/Hicard";
import Home from "./Component/Home/Home";
import Mainpage from "./Component/Mainpage";
import MuflisOneDay from "./Component/Home/Games/MuflisOneDay";
import Rootlayout from "./Component/RootLayout/Rootlayout";
import Roulette from "./Component/Home/Games/Roulette";
import TeenPatti from "./Component/Home/Games/TeenPatti/TeenPatti";
import TeenPattiMuflis from "./Component/Home/Games/TeemPattiMuflis/TeenPattiMuflis";
import ThirtyTwoCards from "./Component/Home/Games/ThirtyTwoCards";
import TwoCardsTeenPatti from "./Component/Home/Games/TwoCardsTeenPatti";

// import RegisterPage from "./Component/Login/RegisterPage";

// import Login from "./Component/Login/Login";

// import RaceGame from "./Component/Home/Games/RaceGame";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="RegisterPage" element={<RegisterPage />} /> */}
      {/* <Route path="SignUp" element={<SignUP />} /> */}
      {/* <Route path="SignUp" element={<Login />} /> */}
      {/* <Route path="racegame" element={<RaceGame />} /> */}
      <Route path="app1" element={<App1 />} />

      <Route path="/" element={<Rootlayout />}>
        <Route index element={<Mainpage />} />
        <Route path="mainpage" element={<Mainpage />} />
        <Route path="home" element={<Home />} />
        <Route path="dragontiger" element={<DragonTiger />} />
        <Route path="andarbahar" element={<AndarBahar />} />
        <Route path="teenpattimuflis" element={<TeenPattiMuflis />} />
        <Route path="2cardsteenpatti" element={<TwoCardsTeenPatti />} />
        <Route path="32Cards" element={<ThirtyTwoCards />} />
        <Route path="dragontigerlion" element={<DragonTigerLion />} />
        <Route path="muflisoneday" element={<MuflisOneDay />} />
        <Route path="highcards" element={<Hicard />} />
        <Route path="rouellte" element={<Roulette />} />

        <Route path="dragontigertesting" element={<DragonTesting />} />
        <Route path="3cardsteenpatti" element={<TeenPatti />} />

        {/* <Route path="admin" element={<Admin />} /> */}
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
