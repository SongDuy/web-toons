import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useShowNavRView = () => {
  const location = useLocation();
  const [showNavRView, setShowNavRView] = useState(false);

  useEffect(() => {
    const NavRView = [
      "/",
      "/Subscribed",
      "/comment",
      "/Creators",
      "/account",
      "/terms/superLikePolicy",
      "/terms/adRevenueSharingPolicy",
      "/terms/canvasTermsOfUsePolicy",
      "/terms/canvasPolicy",
      "/terms/privacyPolicy",
      "/terms",
      '/videos',
      '/genres',
      '/originals',
      '/popular',
      '/original/series'
    ];

    setShowNavRView(NavRView.includes(location.pathname));
  }, [location.pathname, showNavRView]);

  return showNavRView;
};
export default useShowNavRView;
