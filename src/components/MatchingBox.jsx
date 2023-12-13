import Profile from "./Profile";

function MatchingBox({ me, buddy, draw, isDrawing }) {
  return (
    <div className="matchingBox">
      <div className="profiles">
        <Profile className="me" title="Secret Santa" profile={me} />
        <img
          className="santaRaindeer"
          src="../../public/reindeer-and-santa.gif"
          alt="reindeer-and-santa.gif"
        />
        <Profile className="buddy" title="Lucky Wisher" profile={buddy} />
      </div>
      {me.buddy === undefined && (
        <button
          disabled={isDrawing === "drawn"}
          className="drawBtn"
          onClick={() => draw()}
        >
          {isDrawing === "ready"
            ? "Start"
            : isDrawing === "drawing"
            ? "Stop"
            : isDrawing === "drawn"
            ? "Matched"
            : "Start"}
        </button>
      )}
    </div>
  );
}

export default MatchingBox;
