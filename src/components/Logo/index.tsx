import { useTheme } from "../../hooks/useTheme";

const Logo = () => {
  const { isMapInDarkMode } = useTheme();
  return (
    <div
      className="fixed z-10 w-dvw h-dvh bg-[url(/logo.svg)] flex items-center justify-center pointer-events-none bg-[size:auto_80px]"
      style={{
        backgroundPosition: "center center",
        opacity: isMapInDarkMode ? 0.12 : 0.08,
      }}
    ></div>
  );
};

export default Logo;
