import React,{useState,useEffect} from 'react';
import aboutFireBase from '../../common/services/About.services';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ResponsiveText from '../../Hooks/ResponsiveText';
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
              <div className="flex justify-center items-center font-bold mb-5">
              <ResponsiveText text="정보" />
              </div>
            
            <div className="container flex justify-center items-center">
            <ResponsiveText text={About.length>0 && About[0]?.Note} />
      
      </div>
            </div>

        </div>
      )}
      </>
    );
}

export default About;
