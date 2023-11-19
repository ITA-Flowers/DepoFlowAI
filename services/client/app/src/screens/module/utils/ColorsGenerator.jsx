export const generateColor = (index) => {
  const goldenRatioConjugate = 0.618033988749895;
  const hue = (index * goldenRatioConjugate) % 1;

  const h = Math.floor(hue * 360);
  const s = 75; // Nasycenie (saturation)
  const l = 60; // Jasność (lightness)

  return `hsl(${h}, ${s}%, ${l}%)`;
};
