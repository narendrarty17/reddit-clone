const width = "25px";
const height = "25px";

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
      <g clip-path="url(#clip0_15_152)">
        <circle
          cx="10.5"
          cy="10.5"
          r="6.5"
          stroke="#6B7280"
          stroke-linejoin="round"
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
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export { Create, Search, DownArrow };
