export default function trackingDots(length, curIndex) {
  let trackingDots = [];
  for (let j = 0; j < length; j++) {
    trackingDots.push(
      <div
        key={j}
        className={`w-2 h-2 rounded-full ${
          curIndex === j ? "bg-gray-200" : "bg-gray-600"
        }`}
      />
    );
  }
  return trackingDots;
}
