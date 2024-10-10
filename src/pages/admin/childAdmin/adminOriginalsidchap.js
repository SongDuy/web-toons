import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getchaptersComic } from '../../../common/store/comic';
import { unwrapResult } from '@reduxjs/toolkit';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css"; // Import the text layer CSS
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import ReactPlayer from "react-player";

const AdminOriginalsidchap = () => {
  const id = useParams();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [chapid, setchapid] = useState([]);
  const [numPages, setNumPages] = useState();
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  const [isMusic, setIsMusic] = useState(false);

  useEffect(() => {

    const get = async () => {
      try {
        setloading(false)
        const chap = await dispatch(getchaptersComic(id.id))
        const chapid = unwrapResult(chap);
        setchapid(
          chapid.success
            ? chapid?.chaps.filter((item) => item.id === id.idchap)[0]
            : []
        );
        setloading(true)
      } catch (error) {

      }
    }
    get()
  }, [dispatch, id]);
  const file = useMemo(
    () => ({
      url: chapid?.fileURL
        ? chapid?.fileURL
        : "https://firebasestorage.googleapis.com/v0/b/webtoons-2ae20.appspot.com/o/cms_uploads%2Fcomic%2Fepisodes%2FIAsCigDN5La3LV2GtFOl0YnL9kG3%2Fp21CPp0sVnIMjq2zgX0o%2Fchap%2F9fNgdUbNDG7mV5bi7dkf%2Fnhasachmienphi-truyen-tranh-doremon.pdf?alt=media&token=7543361b-cddf-4e4f-9aaa-9bfe8a91ce14",
    }),
    [chapid]
  );
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <>
    
      {loading ?
        <div className="w-full h-[600px] py-5 bg-white custom-scrollbar">
           {chapid?.audioUrl&&
           <div>
           {!isMusic ? (
                      <button
                        className="w-[30px] h-[30px] rounded-full text-white bg-gray-800 flex items-center justify-center"
                        onClick={() => setIsMusic(true)}
                      >
                        <MusicNoteIcon />
                      </button>
                    ) : (
                      <button
                        className="w-[30px] h-[30px] rounded-full text-white bg-gray-800 flex items-center justify-center"
                        onClick={() => setIsMusic(false)}
                      >
                        <MusicOffIcon />
                      </button>
                    )}
                    <ReactPlayer
                      url={chapid?.audioUrl}
                      controls={true}
                      width="0%"
                      height="0%"
                      playing={!isMusic}
                      loop={true}
                    />
           </div>
}
          <div>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<CircularProgress />}

            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </div>
        : <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
          <CircularProgress />
        </Box>}
    </>
  );
}

export default AdminOriginalsidchap;
