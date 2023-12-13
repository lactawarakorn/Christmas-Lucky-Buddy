import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MatchingBox from "./components/MatchingBox";
import peopleData from "./peopleData.json";
import WhoAreYou from "./components/WhoAreYou";
import Profile from "./components/Profile";
import Password from "./components/Password";

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
  const [pass, setPass] = useState(false);

  const buddyIdx = useRef();
  const interval = useRef(null);

  const bgMusic = new Audio("/backgroundMusic.mp3");
  const drawingMusic = new Audio("/drawing.mp3");
  const matchedMusic = new Audio("matched.mp3");
  bgMusic.volume = 0.2;

  const chooseMe = (profile) => {
    const newBuddyLists = peopleLists
      .map((currentLists) => ({ ...currentLists }))
      .filter((p) => p.id !== profile.id && p.chosenBy === undefined);

    setMe(profile);
    setBuddyLists(newBuddyLists);
    setIsDrawing("ready");
    setToDraw(true);

    bgMusic.play();

    console.log(newBuddyLists);
  };

  const random = {
    start: () => {
      const randomList = peopleLists.filter((p) => p.id !== me.id);
      interval.current = setInterval(() => {
        buddyIdx.current = Math.floor(Math.random() * randomList.length);
        setBuddy(randomList[buddyIdx.current]);
      }, 100);

      drawingMusic.play();
    },

    stop: () => {
      clearInterval(interval.current);
      interval.current = null;

      //to random
      // const luckyBuddy =
      //   buddyLists[Math.floor(Math.random() * buddyLists.length)];
      // setBuddy(luckyBuddy);
      // updatePeopleData(luckyBuddy);

      //Already Random
      const luckyBuddy = peopleLists.filter((b) => b.name === me.buddy)[0];
      console.log(luckyBuddy);
      setBuddy(luckyBuddy);

      matchedMusic.play();
      // console.log(luckyBuddy);
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

  const saveToJson = () => {
    const toSave = JSON.stringify(peopleLists.map((p) => ({ ...p })));
    console.log(toSave);
  };

  const checkMatching = (passwordInput) => {
    if (passwordInput === me.password) {
      setPass(true);
    }
  };

  return (
    <div className="app">
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
        pass ? (
          <MatchingBox
            me={me}
            buddy={buddy}
            isDrawing={isDrawing}
            draw={draw}
          />
        ) : (
          <>
            <Profile profile={me} />
            <Password checkMatching={checkMatching} />
          </>
        )
      ) : (
        <>
          <Profile profile={me} />
          <WhoAreYou peopleLists={peopleLists} chooseMe={chooseMe} />
        </>
      )}

      {/* <button onClick={next}>Next Person</button>

      <button onClick={saveToJson}>Save To Json</button> */}
      <div className="footer">
        <h2>🎄</h2>
        <h4>Application By</h4>
        <h3>❝ LACTA ❞</h3>
      </div>
    </div>
  );
}

export default App;
