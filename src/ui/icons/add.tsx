function AddIcon({ color = "currentColor", size = "1em" }) {
  return (
    <svg
      stroke={color}
      fill={color}
      stroke-width="0"
      viewBox="0 0 24 24"
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
    </svg>
  );
}

export default AddIcon;
