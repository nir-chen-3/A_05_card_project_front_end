import { useTheme } from "../context/theme.context";

function logo() {
  const { theme } = useTheme();
  const themeChange = `text-${theme === "dark" ? "light" : "dark"}`;
  return (
    <div className={themeChange}>
      <span>
        Pro <i className="bi bi-android "></i> Card
      </span>
    </div>
  );
}

export default logo;
