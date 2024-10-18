import { useState } from "react";

const color = "#ffffff";
const hoverColor = "#f87171";

function UpDownVote({
  count = 44,
  handleClickUp = () => {},
  handleClickDown = () => {},
}) {
  const [hoveredFirst, setHoveredFirst] = useState(false);
  const [hoveredSecond, setHoveredSecond] = useState(false);

  return (
    <button className="flex gap-2 items-center bg-midGray px-3 text-white py-2 rounded-3xl">
      <svg
        onClick={handleClickUp}
        fill={hoveredFirst ? hoverColor : color}
        height="16px"
        width="16px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 511.947 511.947" // Added viewBox
        onMouseEnter={() => setHoveredFirst(true)}
        onMouseLeave={() => setHoveredFirst(false)}
      >
        <g>
          <g>
            <path
              d="M476.847,216.373L263.513,3.04c-4.267-4.053-10.88-4.053-15.04,0L35.14,216.373c-4.16,4.16-4.16,10.88-0.107,15.04
                    c2.027,2.027,4.8,3.2,7.573,3.2h128V501.28c0,5.867,4.8,10.667,10.667,10.667h149.333c5.867,0,10.667-4.8,10.667-10.667V234.613
                    h128c5.867,0,10.667-4.8,10.667-10.667C479.94,221.067,478.873,218.4,476.847,216.373z M330.607,213.28
                    c-5.867,0-10.667,4.8-10.667,10.667v266.667h-128V223.947c0-5.867-4.8-10.667-10.667-10.667H68.42L255.94,25.547L443.567,213.28
                    H330.607z"
            />
          </g>
        </g>
      </svg>
      <span>{count}</span>
      <svg
        onClick={handleClickDown}
        fill={hoveredSecond ? hoverColor : color}
        height="16px"
        width="18px"
        version="1.1"
        id="Layer_2" // Changed ID for clarity
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 511.947 511.947" // Added viewBox
        onMouseEnter={() => setHoveredSecond(true)}
        onMouseLeave={() => setHoveredSecond(false)}
      >
        <g>
          <g>
            <path
              d="M479.114,283.84c-1.707-3.947-5.547-6.507-9.813-6.507h-128V10.667C341.3,4.8,336.5,0,330.633,0H181.3
                c-5.867,0-10.667,4.8-10.667,10.667v266.667h-128c-5.867,0-10.667,4.8-10.56,10.773c0,2.773,1.067,5.44,3.093,7.36L248.5,508.907
                c4.16,4.16,10.88,4.16,15.04,0l213.333-213.44C479.86,292.373,480.82,287.893,479.114,283.84z M255.967,486.293L68.34,298.667
                H181.3c5.867,0,10.667-4.8,10.667-10.667V21.333h128V288c0,5.867,4.8,10.667,10.667,10.667h112.96L255.967,486.293z"
            />
          </g>
        </g>
      </svg>
    </button>
  );
}

function Comment({ count = 11, handleClick = () => {} }) {
  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center bg-midGray px-3 text-white py-2 rounded-3xl hover:bg-gray-600"
    >
      <svg
        width="18px"
        height="18px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>comment-5</title>
        <desc>Created with Sketch Beta.</desc>
        <defs></defs>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g id="Icon-Set" transform="translate(-360.0, -255.0)" fill={color}>
            <path
              d="M390,277 C390,278.463 388.473,280 387,280 L379,280 L376,284 L373,280 L365,280 C363.527,280 362,278.463 362,277 L362,260 C362,258.537 363.527,257 365,257 L387,257 C388.473,257 390,258.537 390,260 L390,277 L390,277 Z M386.667,255 L365.333,255 C362.388,255 360,257.371 360,260.297 L360,277.187 C360,280.111 362.055,282 365,282 L371.639,282 L376,287.001 L380.361,282 L387,282 C389.945,282 392,280.111 392,277.187 L392,260.297 C392,257.371 389.612,255 386.667,255 L386.667,255 Z"
              id="comment-5"
            ></path>
          </g>
        </g>
      </svg>
      <span>{count}</span>
    </button>
  );
}

function Badge({ handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center bg-midGray px-4 text-white py-1 rounded-3xl hover:bg-600 hover:bg-gray-600"
    >
      <svg
        fill={color}
        width="20px"
        height="20px"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M31.908 26.249l-5.852-10.822c0.597-1.355 0.931-2.852 0.931-4.428 0-6.072-4.922-10.994-10.994-10.994-6.073 0-10.995 4.923-10.995 10.994 0 1.614 0.351 3.145 0.974 4.524l-5.878 10.721c-0.19 0.345-0.158 0.77 0.079 1.084 0.237 0.314 0.638 0.461 1.022 0.371l5.019-1.151 1.718 4.785c0.134 0.372 0.474 0.63 0.867 0.659 0.025 0.002 0.050 0.003 0.074 0.003 0.366 0 0.706-0.201 0.881-0.527l5.116-9.53c0.369 0.038 0.744 0.057 1.123 0.057 0.347 0 0.69-0.018 1.029-0.050l5.227 9.532c0.177 0.323 0.514 0.52 0.877 0.52 0.026 0 0.052-0.001 0.078-0.003 0.392-0.032 0.73-0.289 0.863-0.659l1.718-4.785 5.020 1.151c0.385 0.093 0.782-0.057 1.020-0.369s0.27-0.735 0.084-1.081zM9.056 28.542l-1.258-3.505c-0.172-0.477-0.671-0.754-1.165-0.637l-3.712 0.852 4.231-7.718c1.393 1.883 3.373 3.303 5.67 3.994zM7.007 10.999c0-4.955 4.032-8.986 8.986-8.986s8.985 4.031 8.985 8.986-4.031 8.986-8.986 8.986c-4.955 0-8.986-4.032-8.986-8.986zM25.367 24.4c-0.496-0.117-0.993 0.16-1.165 0.636l-1.267 3.53-3.849-7.017c2.357-0.691 4.386-2.148 5.797-4.085l4.214 7.791z"></path>
      </svg>
    </button>
  );
}

function Share({ handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="flex gap-2 items-center bg-midGray px-3 text-white py-2 rounded-3xl hover:bg-gray-600"
    >
      <svg
        width="25px"
        height="25px"
        viewBox="0 -0.5 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.734 15.8974L19.22 12.1374C19.3971 11.9927 19.4998 11.7761 19.4998 11.5474C19.4998 11.3187 19.3971 11.1022 19.22 10.9574L14.734 7.19743C14.4947 6.9929 14.1598 6.94275 13.8711 7.06826C13.5824 7.19377 13.3906 7.47295 13.377 7.78743V9.27043C7.079 8.17943 5.5 13.8154 5.5 16.9974C6.961 14.5734 10.747 10.1794 13.377 13.8154V15.3024C13.3888 15.6178 13.5799 15.8987 13.8689 16.0254C14.158 16.1521 14.494 16.1024 14.734 15.8974Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Share</span>
    </button>
  );
}
export { UpDownVote, Comment, Badge, Share };
