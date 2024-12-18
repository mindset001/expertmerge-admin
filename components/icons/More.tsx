
function More({ color }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill={`${ color || '#98A2B3'}`}
        fillRule="evenodd"
        d="M3.5 10.98A2.5 2.5 0 011 8.48v-5A2.5 2.5 0 013.5.98h5a2.5 2.5 0 012.5 2.5v5a2.5 2.5 0 01-2.5 2.5h-5zM3 8.48a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5v5zM7.176 12.675a2.37 2.37 0 00-3.352 0l-2.63 2.63a2.37 2.37 0 000 3.352l2.63 2.63a2.37 2.37 0 003.352 0l2.63-2.63a2.37 2.37 0 000-3.353l-2.63-2.63zm-1.938 1.414a.37.37 0 01.524 0l2.63 2.63a.37.37 0 010 .523l-2.63 2.63a.37.37 0 01-.524 0l-2.63-2.63a.37.37 0 010-.523l2.63-2.63zM12 19.48a2.5 2.5 0 002.5 2.5h5a2.5 2.5 0 002.5-2.5v-5a2.5 2.5 0 00-2.5-2.5h-5a2.5 2.5 0 00-2.5 2.5v5zm2.5.5a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-5zM12 5.98a5 5 0 1010 0 5 5 0 00-10 0zm5-3a3 3 0 110 6 3 3 0 010-6z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default More;