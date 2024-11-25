import React,{useState,useEffect} from 'react';
import aboutFireBase from '../../common/services/About.services';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const About = () => {
    const [loading, setloading] = useState(false);
    const [About, setAbout] = useState([]);
    useEffect(() => {
        const get = async () => {
            try {
              setloading(false);
              const Abouts = await aboutFireBase.getAll();
              setAbout(Abouts.success ? Abouts.about : []);
              setloading(true);
            } catch (error) { 
              console.log(error)
            }
          };
          get();
    }, []);
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
              

            <div  className="w-screen h-full py-[30px]   container mx-auto my-auto " >
              <p className="text-2xl font-bold text-center mb-5">   
                                    <span>정보</span>
                                </p>
            <div>
        <p className="text-xl">{About.length>0 && About[0]?.Note}</p>
      </div>
            </div>

        </div>
      )}
      </>
    );
}

export default About;
