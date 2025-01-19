export const generateId = () =>
  `id-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 10)}`;

export const getTextColor = (bgColor: string) => {
  const color = bgColor.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 128 ? "#000" : "#fff";
};
