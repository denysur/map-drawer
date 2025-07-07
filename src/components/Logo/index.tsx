import { useScreenshot } from "../../hooks/state/useScreenshot";

const Logo = () => {
  const { isScreenshoting } = useScreenshot();

  return (
    <div
      className="fixed z-10 w-dvw h-dvh mix-blend-color-burn bg-[url(/logo.svg)] flex items-center justify-center pointer-events-none"
      style={{
        backgroundSize: "auto max(32px, 3vmax)",
        backgroundPosition: "center center",
        opacity: isScreenshoting ? 0.3 : 0.04,
      }}
    ></div>
  );
};

export default Logo;
