import React,{useEffect} from 'react';

import SeriesPage from './series';
import EpisodesPage from './episodes';
import { useSelector,useDispatch } from 'react-redux';
import { setcurrentStepVideo } from '../../../common/store/hidden';
import { useParams } from 'react-router-dom';

const CreateVideoPage = () => {

    const currentStepVideo = useSelector(state => state.hidden.currentStepVideo);
    const dispatch = useDispatch();
    const id = useParams();
    useEffect(() => {
        if(id?.idchap && id?.id){
            dispatch(setcurrentStepVideo(2))
        }
    }, [dispatch,id]);
    const goToNextStep = () => {
        window.scrollTo(0, 0); // Cuộn đến đầu trang trước khi chuyển trang
        dispatch(setcurrentStepVideo(currentStepVideo+1))
    };

    const goToPreviousStep = () => {
        window.scrollTo(0, 0); // Cuộn đến đầu trang trước khi chuyển trang
        dispatch(setcurrentStepVideo(currentStepVideo-1))
    };

    return (
        <div className="min-w-full container mx-auto my-auto">
            {currentStepVideo === 1 && <SeriesPage goToEposodes={goToNextStep} />}
            {currentStepVideo === 2 && <EpisodesPage goToPreviousStep={goToPreviousStep} />}
        </div>

    );
}

export default CreateVideoPage;
