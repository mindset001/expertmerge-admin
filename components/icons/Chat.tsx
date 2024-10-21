
function Chat({ color }: { color?: string}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 25 25"
    >
      <path
        fill={`${ color || '#98A2B3'}`}
        d="M6.5 8.98a1 1 0 011-1h5a1 1 0 110 2h-5a1 1 0 01-1-1zM7.5 11.98a1 1 0 100 2h9a1 1 0 100-2h-9z"
      ></path>
      <path
        fill={`${ color || '#98A2B3'}`}
        fillRule="evenodd"
        d="M15.9 20.43l1.4-1.05a2 2 0 011.2-.4 4 4 0 004-4v-8a4 4 0 00-4-4h-12a4 4 0 00-4 4v8a4 4 0 004 4h2a2 2 0 011.2.4l1.4 1.05a4 4 0 004.8 0zm2.6-3.45a4 4 0 00-2.4.8l-1.4 1.05a2 2 0 01-2.4 0l-1.4-1.05a4 4 0 00-2.4-.8h-2a2 2 0 01-2-2v-8a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default Chat;