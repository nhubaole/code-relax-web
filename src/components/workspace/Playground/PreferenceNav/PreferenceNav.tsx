import { useState, useEffect, useRef } from "react";
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
  AiOutlineCheck,
} from "react-icons/ai";
import { ISettings } from "../Playground";
import SettingsModal from "../../../modals/SettingsModal";

type PreferenceNavProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
  onLanguageChange: (language: string) => void; // Thêm prop cho sự kiện thay đổi ngôn ngữ
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({
  setSettings,
  settings,
  onLanguageChange, // Nhận prop xử lý sự kiện thay đổi ngôn ngữ
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener("fullscreenchange", exitHandler);
      document.addEventListener("webkitfullscreenchange", exitHandler);
      document.addEventListener("mozfullscreenchange", exitHandler);
      document.addEventListener("MSFullscreenChange", exitHandler);
    }
  }, [isFullScreen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
    onLanguageChange(language); // Gọi hàm xử lý sự kiện thay đổi ngôn ngữ và truyền ngôn ngữ mới
  };

  const languages = ["C++", "Python", "Java"];

  return (
    <div className="flex items-center px-4 justify-between bg-[#1E1E1E] h-11 w-full relative">
      <button
        id="dropdownHoverButton"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex cursor-pointer items-center rounded-lg focus:outline-none bg-[#2A2B2D] text-sm text-gray px-3 py-2  font-medium"
        type="button"
      >
        {selectedLanguage}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownHover"
          ref={dropdownRef}
          className="z-10 bg-blacklight divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-11 left-0 "
        >
          <ul
            className="py-2 text-sm text-gray dark:text-textcolor "
            aria-labelledby="dropdownHoverButton"
          >
            {languages.map((language) => (
              <li key={language}>
                <a
                  href="#"
                  onClick={() => handleLanguageSelect(language)}
                  className=" px-4 py-2 hover:bg-black dark:hover:bg-dark-fill-3 dark:hover:text-gray flex justify-between"
                >
                  {language}
                  {selectedLanguage === language && (
                    <AiOutlineCheck className="text-gray" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default PreferenceNav;
