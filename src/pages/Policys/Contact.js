import React,{useState,useEffect} from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import contactFireBase from '../../common/services/Contact.services';
import ResponsiveText from '../../Hooks/ResponsiveText';
const Contact = () => {
    const [loading, setloading] = useState(false);
    const [contact, setcontact] = useState([]);
    useEffect(() => {
        const get = async () => {
            try {
              setloading(false);
              const contact = await contactFireBase.getAll();
              setcontact(contact.success ? contact.contact : []);
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
              <ResponsiveText text="연락처" />
              </div>
              <div className="container flex justify-center items-center">
            <ResponsiveText text={contact.length>0 && contact[0]?.Note} />
      
      </div>
          
            </div>

        </div>
      )}
      </>
    );
}

export default Contact;
