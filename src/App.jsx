import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AndarBahar from "./Component/Home/Games/Andar&Bahar/AndarBahar";
import DragonTiger from "./Component/Home/Games/DragonTiger/DragonTiger";
import DragonTigerLion from "./Component/Home/Games/DragonTigerLion/DragonTigerLion";
import HighCard from "./Component/Home/Games/HighCard/HighCard";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/login";
import Mainpage from "./Component/Mainpage";
import MuflisOneDay from "./Component/Home/Games/Muflis One Day/MuflisOneDay";
import Rootlayout from "./Component/RootLayout/Rootlayout";
import TeenPatti from "./Component/Home/Games/TeenPatti/TeenPatti";
import TeenPattiMuflis from "./Component/Home/Games/TeenPattiMuflis/TeenPattiMuflis";
import ThirtyTwoCards from "./Component/Home/Games/ThirtyTwoCards/ThirtyTwoCards";
import TwoCardsPattiTesting from "./Component/Home/Games/TwoCardspatti/TwoCardsPattiTesting";
import TwoCardsTeenPatti from "./Component/Home/Games/TwoCardspatti/TwoCardspatti";

// import Login from "./Component/Login/Login";










// import ThirtyTwoCards from "./Component/Home/Games/32Cards/ThirtyTwoCards";

// import HighCardTesting from "./Component/Home/Games/HighCard/highcardTesting";

// import DragonTesting from "./Component/Home/Games/DragonTesting";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* <Route path="RegisterPage" element={<RegisterPage />} /> */}
      {/* <Route path="SignUp" element={<SignUP />} /> */}
      {/* <Route path="SignUp" element={<Login />} /> */}
      {/* <Route path="racegame" element={<RaceGame />} /> */}
   
      <Route index element={<Login />} />

      <Route path="/" element={<Rootlayout />}>
        <Route path="mainpage" element={<Mainpage />} />
        <Route path="home" element={<Home />} />
        <Route path="dragontiger" element={<DragonTiger />} />
        <Route path="andarbahar" element={<AndarBahar />} />
        <Route path="teenpattimuflis" element={<TeenPattiMuflis />} />
        <Route path="muflisoneday" element={<MuflisOneDay />} />
        <Route path="2cardsteenpatti" element={<TwoCardsTeenPatti />} />
        <Route
          path="2cardsteenpattiTesting"
          element={<TwoCardsPattiTesting />}
        />
        <Route path="dragontigerlion" element={<DragonTigerLion />} />
        <Route path="muflisoneday" element={<MuflisOneDay />} />
        <Route path="highcards" element={<HighCard />} />
        {/* <Route path="highCardTesting" element={<HighCardTesting />} /> */}
        {/* <Route path="rouellte" element={<Roulette />} /> */}

        {/* <Route path="dragontigertesting" element={<DragonTesting />} /> */}
        <Route path="3cardsteenpatti" element={<TeenPatti />} />
        <Route path="thirtytwocards" element={<ThirtyTwoCards />} />
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
