import { useState, useEffect } from "react";

const ResponsiveText = ({ text }) => {
  const [fontSize, setFontSize] = useState("1rem");
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });
  
  // Hàm theo dõi kích thước màn hình
  useEffect(() => {
    const calculateFontSize = () => {
      if (windowSize.width < 640) return "0.875rem"; // 14px
      if (windowSize.width < 768) return "1rem"; // 16px
      if (windowSize.width < 1024) return "1.125rem"; // 18px
      if (windowSize.width < 1280) return "1.25rem"; // 20px
      if (windowSize.width < 1536) return "1.5rem"; // 24px
      if (windowSize.width < 1920) return "1.75rem"; // 28px
      return "2rem"; // 32px
    };
  
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
      setFontSize(calculateFontSize());
    };

    handleResize(); // Gọi hàm khi component render lần đầu
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize.width]);

  
  return <p style={{ fontSize }}>{text}</p>;
};

export default ResponsiveText;