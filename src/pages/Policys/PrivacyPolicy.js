import React,{useMemo,useState,useEffect} from 'react';
import NavPolicys from '../../components/Policys/navPolicys';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css"; // Import the text layer CSS
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import CircularProgress from "@mui/material/CircularProgress";
import privacyFireBase from '../../common/services/Privacy.services';
import Box from "@mui/material/Box";

const PrivacyPolicy = () => {
  const [numPages, setNumPages] = useState();
  const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const [loading, setloading] = useState(false);

    const [Privacy, setPrivacy] = useState([]);

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  useEffect(() => {
    const get = async () => {
        try {
          setloading(false);
          const privacy = await privacyFireBase.getAll();
          setPrivacy(privacy.success ? privacy.privacy : []);
          setloading(true);
        } catch (error) { 
          console.log(error)
        }
      };
      get();
}, []);
  useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
 
  const file = useMemo(
      () => ({
        url:Privacy.length>0?Privacy[0]?.File:"https://firebasestorage.googleapis.com/v0/b/webtoons-2ae20.appspot.com/o/cms_uploads%2Fcomic%2Fepisodes%2FIAsCigDN5La3LV2GtFOl0YnL9kG3%2Fp21CPp0sVnIMjq2zgX0o%2Fchap%2F9fNgdUbNDG7mV5bi7dkf%2Fnhasachmienphi-truyen-tranh-doremon.pdf?alt=media&token=7543361b-cddf-4e4f-9aaa-9bfe8a91ce14",
      }),
      [Privacy]
    );
    const options = useMemo(
      () => ({
        cMapUrl: "cmaps/",
        cMapPacked: true,
        standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
  
        // Add any other options you might have here
      }),
      []
    );
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    const calculateWidth = () => {
      const baseWidth = windowSize.width; // Chiều rộng của màn hình
      if (windowSize.width < 640) {
        return baseWidth * 0.95; // Đối với màn hình nhỏ (xs), chiếm 95% chiều rộng
      } else if (windowSize.width < 768) {
        return baseWidth * 0.90; // Đối với màn hình vừa (sm), chiếm 90% chiều rộng
      } else if (windowSize.width < 1024) {
        return baseWidth * 0.85; // Đối với màn hình lớn (md), chiếm 85% chiều rộng
      } else if (windowSize.width < 1280) {
        return baseWidth * 0.80; // Đối với màn hình rất lớn (lg), chiếm 80% chiều rộng
      } else if (windowSize.width < 1536) {
        return baseWidth * 0.75; // Đối với màn hình cực lớn (xl), chiếm 75% chiều rộng
      } else if (windowSize.width < 1920) {
        return baseWidth * 0.70; // Đối với màn hình siêu lớn (2xl), chiếm 70% chiều rộng
      } else {
        return baseWidth * 0.65; // Đối với màn hình cực kỳ lớn (3xl), chiếm 65% chiều rộng
      }
    };
  return (
    <>
    {!loading ? (
   <Box
     sx={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       margin: 5,
     }}
   >
     <CircularProgress />
   </Box>
 ) : (
      <div  className="w-full h-full  ">
              <NavPolicys/>

              <div className="w-full h-full pt-[50px] flex items-center justify-center">
            <div className="w-full h-full overflow-hidden flex justify-center items-center">
              {file && (
                <Document
                  options={options}
                  file={file}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<CircularProgress />}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={calculateWidth()} // Tính toán chiều rộng dựa trên kích thước màn hình
                    />
                  ))}
                </Document>
              )}
            </div>
          </div>

      </div>
        )}
        </>
  );
}

export default PrivacyPolicy;
