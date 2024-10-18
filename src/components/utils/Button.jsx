const mapColors = {
  red: "#d93900",
};

const Button = ({ text = "Log In", bgColor = "red", handleClick }) => {
  const color = mapColors[bgColor];
  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: color }}
      className={`text-white px-4 py-2 rounded-3xl font-semibold`}
    >
      {text}
    </button>
  );
};

export { Button };
