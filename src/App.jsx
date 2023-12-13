import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MatchingBox from "./components/MatchingBox";
import peopleData from "./peopleData.json";
import WhoAreYou from "./components/WhoAreYou";
import Profile from "./components/Profile";

const anonymous = {
  santa: { name: "Secret Santa", picture: "/santa.jpg" },
  wisher: { name: "?", picture: "/unknown.png" },
};

function App() {
  const [peopleLists, setPeopleLists] = useState(peopleData);
  const [me, setMe] = useState(anonymous.santa);
  const [buddy, setBuddy] = useState(anonymous.wisher);
  const [isDrawing, setIsDrawing] = useState("");
  const [buddyLists, setBuddyLists] = useState(peopleData);
  const [toDraw, setToDraw] = useState(false);

  const buddyIdx = useRef();
  const interval = useRef(null);

  const chooseMe = (profile) => {
    const newBuddyLists = peopleLists
      .map((currentLists) => ({ ...currentLists }))
      .filter((p) => p.id !== profile.id && p.chosenBy === undefined);

    setMe(profile);
    setBuddyLists(newBuddyLists);
    setIsDrawing("ready");
    setToDraw(true);

    console.log(newBuddyLists);
  };

  const random = {
    start: () => {
      const randomList = peopleLists.filter((p) => p.id !== me.id);
      interval.current = setInterval(() => {
        buddyIdx.current = Math.floor(Math.random() * randomList.length);
        setBuddy(randomList[buddyIdx.current]);
      }, 100);
    },

    stop: () => {
      clearInterval(interval.current);
      interval.current = null;
      const luckyBuddy =
        buddyLists[Math.floor(Math.random() * buddyLists.length)];
      setBuddy(luckyBuddy);
      updatePeopleData(luckyBuddy);

      console.log(luckyBuddy);
    },
  };

  const updatePeopleData = (buddy) => {
    const newPeopleLists = peopleLists.map((e) =>
      me.id === e.id
        ? { ...e, buddy: buddy.name }
        : buddy.id === e.id
        ? { ...e, chosenBy: me.name }
        : { ...e }
    );

    setPeopleLists(newPeopleLists);

    console.log(newPeopleLists);
  };

  const draw = () => {
    if (isDrawing === "ready") {
      setIsDrawing("drawing");
      random.start();
    } else if (isDrawing === "drawing") {
      setIsDrawing("drawn");
      random.stop();
    }
  };

  const next = () => {
    setToDraw(false);
    setIsDrawing("");
    setMe(anonymous.santa);
    setBuddy(anonymous.wisher);
  };

  return (
    <>
      <h1>
        {isDrawing === "ready"
          ? "Are You Ready?"
          : isDrawing === "drawing"
          ? "Draw It Now!"
          : isDrawing === "drawn"
          ? "Matched!!!"
          : "Who Are You?"}
      </h1>
      {toDraw ? (
        <MatchingBox me={me} buddy={buddy} isDrawing={isDrawing} draw={draw} />
      ) : (
        <>
          <Profile profile={me} title={null} />
          <WhoAreYou peopleLists={peopleLists} chooseMe={chooseMe} />
        </>
      )}

      <button onClick={next}>Next Person</button>
    </>
  );
}

export default App;
