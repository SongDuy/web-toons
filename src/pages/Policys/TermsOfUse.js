import React from 'react';
import ChooseLanguage from '../../components/Policys/chooselanguage';
import NavPolicys from '../../components/Policys/navPolicys';
const TermsOfUse = () => {
    return (
        <div  className="w-full h-full  ">
                <NavPolicys/>

            <div  className="w-screen h-full py-[30px]   container mx-auto my-auto " >
                <ChooseLanguage title="If you are accessing from France (Français), Indonesia (Indonesia), Taiwan (中文(繁體)) Thailand(ภาษาไทย) respective regional Terms of Use will apply."/>
            </div>

        </div>
    );
}

export default TermsOfUse;
