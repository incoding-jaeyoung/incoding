/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: generateSizeList(),
      fontSize: generateSizeList(),
      borderRadius: generateSizeList(),
      colors: {
        cobolt: "var(--cobolt)",
      },
    },
  },
  plugins: [],
};

// rem to px 변환 함수
function generateSizeList(arrayLength = 101, multiple = 1, unit = "rem") {
  let object = {};
  const multipleArray = Array.from(
    { length: arrayLength },
    (_, i) => `${i * multiple}${unit}`,
  );

  multipleArray.forEach((value, index) => {
    object[index * multiple] = value;
  });

  return object;
}
