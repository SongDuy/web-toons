import React from 'react';

import SeriesPage from './series';
import EpisodesPage from './episodes';
import { useSelector, useDispatch } from 'react-redux';
import { setcurrentStepOriginal } from '../../../common/store/hidden';

const PublishOriginalPage = () => {
    const dispatch = useDispatch();
    const currentStepOriginal = useSelector(state => state.hidden.currentStepOriginal);
   
    const goToNextStep = () => {
        window.scrollTo(0, 0); // Cuộn đến đầu trang trước khi chuyển trang
        dispatch(setcurrentStepOriginal(currentStepOriginal+1)) 

    };

    const goToPreviousStep = () => {
        window.scrollTo(0, 0); // Cuộn đến đầu trang trước khi chuyển trang
        dispatch(setcurrentStepOriginal(currentStepOriginal-1)) 
    };

    return (
        <div className="container mx-auto my-auto">
            {currentStepOriginal === 1 && <SeriesPage goToEposodes={goToNextStep} />}
            {currentStepOriginal === 2 && <EpisodesPage goToPreviousStep={goToPreviousStep} />}
        </div>

    );
}

export default PublishOriginalPage;