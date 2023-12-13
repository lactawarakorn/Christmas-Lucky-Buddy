function WhoAreYou({ peopleLists, chooseMe }) {
  return (
    <div className="whoAreYou">
      {/* <h2>Who Are You?</h2> */}
      <ul>
        {peopleLists.map((p) => (
          <button
            // disabled={p.buddy !== undefined}
            onClick={() => chooseMe(p)}
            key={p.name}
          >
            {p.name}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default WhoAreYou;
