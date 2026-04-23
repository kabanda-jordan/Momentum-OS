import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import Button from "./Button";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant="secondary" className="gap-2" onClick={toggleTheme} type="button">
      {theme === "dark" ? <SunMedium size={16} /> : <MoonStar size={16} />}
      {theme === "dark" ? "Light" : "Dark"}
    </Button>
  );
};

export default ThemeToggle;
