import React,{useEffect} from 'react';

import SeriesPage from './series';
import EpisodesPage from './episodes';
import { useSelector, useDispatch } from 'react-redux';
import { setcurrentStepOriginal } from '../../../common/store/hidden';
import { useParams } from 'react-router-dom';

const PublishOriginalPage = () => {
    const dispatch = useDispatch();
    const currentStepOriginal = useSelector(state => state.hidden.currentStepOriginal);
    const id = useParams();
    useEffect(() => {
        if(id?.idchap && id?.id){
            dispatch(setcurrentStepOriginal(2))
        }
    }, [dispatch,id]);
    const goToNextStep = () => {
        window.scrollTo(0, 0); // Cuộn đến đầu trang trước khi chuyển trang
        dispatch(setcurrentStepOriginal(currentStepOriginal+1)) 

    };

    const goToPreviousStep = () => {
        window.scrollTo(0, 0); // Cuộn đến đầu trang trước khi chuyển trang
        dispatch(setcurrentStepOriginal(currentStepOriginal-1)) 
    };

    return (
        <div className="min-w-full container mx-auto my-auto">
            {currentStepOriginal === 1 && <SeriesPage goToEposodes={goToNextStep} />}
            {currentStepOriginal === 2 && <EpisodesPage goToPreviousStep={goToPreviousStep} />}
        </div>

    );
}

export default PublishOriginalPage;