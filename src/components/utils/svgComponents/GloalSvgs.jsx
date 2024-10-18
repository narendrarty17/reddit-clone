const width = "25px";
const height = "25px";

function Close({ handleClose }) {
  return (
    <svg
      onClick={handleClose}
      className="cursor-pointer"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>cross-circle</title>
      <desc>Created with Sketch Beta.</desc>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Icon-Set"
          transform="translate(-568.000000, -1087.000000)"
          fill="#FFFFFF"
        >
          <path
            d="M584,1117 C576.268,1117 570,1110.73 570,1103 C570,1095.27 576.268,1089 584,1089 C591.732,1089 598,1095.27 598,1103 C598,1110.73 591.732,1117 584,1117 L584,1117 Z M584,1087 C575.163,1087 568,1094.16 568,1103 C568,1111.84 575.163,1119 584,1119 C592.837,1119 600,1111.84 600,1103 C600,1094.16 592.837,1087 584,1087 L584,1087 Z M589.717,1097.28 C589.323,1096.89 588.686,1096.89 588.292,1097.28 L583.994,1101.58 L579.758,1097.34 C579.367,1096.95 578.733,1096.95 578.344,1097.34 C577.953,1097.73 577.953,1098.37 578.344,1098.76 L582.58,1102.99 L578.314,1107.26 C577.921,1107.65 577.921,1108.29 578.314,1108.69 C578.708,1109.08 579.346,1109.08 579.74,1108.69 L584.006,1104.42 L588.242,1108.66 C588.633,1109.05 589.267,1109.05 589.657,1108.66 C590.048,1108.27 590.048,1107.63 589.657,1107.24 L585.42,1103.01 L589.717,1098.71 C590.11,1098.31 590.11,1097.68 589.717,1097.28 L589.717,1097.28 Z"
            id="cross-circle"
          ></path>
        </g>
      </g>
    </svg>
  );
}

function Create() {
  return (
    <svg
      fill="#8ba2ad"
      width={width}
      height={width}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22,13v7a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V13a1,1,0,0,1,2,0v6H20V13a1,1,0,0,1,2,0ZM12,3a1,1,0,0,0-1,1V8H7a1,1,0,0,0,0,2h4v4a1,1,0,0,0,2,0V10h4a1,1,0,0,0,0-2H13V4A1,1,0,0,0,12,3Z" />
    </svg>
  );
}

function Search() {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_15_152)">
        <circle
          cx="10.5"
          cy="10.5"
          r="6.5"
          stroke="#6B7280"
          strokeLinejoin="round"
        />
        <path
          d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
          fill="#6B7280"
        />
      </g>
      <defs>
        <clipPath id="clip0_15_152">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </svg>
  );
}

function DownArrow() {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10L12 15L17 10"
        stroke="#a5b9c1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export { Create, Search, DownArrow, Close };
