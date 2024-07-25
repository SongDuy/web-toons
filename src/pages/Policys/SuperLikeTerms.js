import React,{useState} from 'react';
import NavPolicys from '../../components/Policys/navPolicys';
const SuperLikeTerms = () => {
    const [Choose, setChoose] = useState('CREATORS');
    return (
        <div  className="w-full h-full  ">
                <NavPolicys/>

            <div  className="w-screen h-full py-[30px]   container mx-auto my-auto " >
            <div className="flex  my-[30px]">
         <button className={`text-xl border border-gray-300 ${Choose==="CREATORS"?"bg-gray-200":"bg-white-100"} py-4 px-[40px] rounded-full mr-1`} onClick={()=>setChoose('CREATORS')}>CREATORS</button>
         <button className={`text-xl border border-gray-300  ${Choose==="USERS"?"bg-gray-200":"bg-white-100"}  py-4 px-[40px] rounded-full mx-1`} onClick={()=>setChoose('USERS')}>USERS</button>
        
     </div>
            </div>

        </div>
    );
}

export default SuperLikeTerms;
