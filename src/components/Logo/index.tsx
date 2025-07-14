const Logo = () => {
  return (
    <div
      className="fixed z-10 w-dvw h-dvh bg-[url(/logo.svg)] flex items-center justify-center pointer-events-none bg-[size:auto_80px]"
      style={{
        // backgroundSize: "auto max(32px, 5vmax)",
        backgroundPosition: "center center",
        opacity: 0.08,
      }}
    ></div>
  );
};

export default Logo;
