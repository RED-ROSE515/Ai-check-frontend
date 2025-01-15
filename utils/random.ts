const getRandomInitials = () => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substring(0, 2)
    .toUpperCase();
};

const generateRandomPastelColor = () => {
  // Generate pastel colors by using higher lightness values
  const hue = Math.floor(Math.random() * 360);
  const saturation = 30 + Math.floor(Math.random() * 30); // 30-60%
  const lightness = 85 + Math.floor(Math.random() * 10); // 85-95%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const generateMatchingOutlineColor = (backgroundColor: string) => {
  // Extract HSL values from the background color
  const hue = parseInt(backgroundColor.match(/hsl\((\d+)/)?.[1] || "0");
  // Create a more saturated and darker version for the outline
  return `hsl(${hue}, 60%, 55%)`;
};

const getRandomColorPair = () => {
  const bgColor = generateRandomPastelColor();
  const outlineColor = generateMatchingOutlineColor(bgColor);

  // Convert HSL to HEX
  const toHex = (color: string) => {
    const el = document.createElement("div");
    el.style.color = color;
    document.body.appendChild(el);
    const computed = getComputedStyle(el).color;
    document.body.removeChild(el);

    // Convert rgb to hex
    const rgb = computed.match(/\d+/g);
    if (!rgb) return "#000000";
    return (
      "#" +
      rgb
        .map((x) => {
          const hex = parseInt(x).toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  return {
    backgroundColor: toHex(bgColor),
    outlineColor: toHex(outlineColor),
  };
};

export { getRandomInitials, getRandomColorPair };
