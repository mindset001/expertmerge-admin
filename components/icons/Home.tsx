
function Home({ color }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="20"
      fill="none"
      viewBox="0 0 21 20"
    >
      <path
        fill={`${ color || '#344054'}`}
        d="M8.78.685L1.903 5.499A3 3 0 00.632 8.187l.705 9.165a2 2 0 002.277 1.827l3.17-.453a2 2 0 001.717-1.98v-1.265a2 2 0 114 0v1.265a2 2 0 001.717 1.98l3.17.453a2 2 0 002.276-1.827l.705-9.165a3 3 0 00-1.27-2.688L12.22.685a3 3 0 00-3.44 0z"
      ></path>
    </svg>
  );
}

export default Home;