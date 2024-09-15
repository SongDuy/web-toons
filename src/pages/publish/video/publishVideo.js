import React, { useState, useEffect } from 'react';

import SeriesPage from './series';
import EpisodesPage from './episodes';
import { useParams } from 'react-router-dom';

const CreateVideoPage = () => {

    const id = useParams();

    const [currentStep, setCurrentStep] = useState(1);
    useEffect(() => {
        if (id?.id) {
            setCurrentStep(2)
        } else {
            setCurrentStep(1)
        }
    }, [id]);
    const goToNextStep = () => {
        window.scrollTo(0, 0); // Cuộn đến đầu trang trước khi chuyển trang
        setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        window.scrollTo(0, 0); // Cuộn đến đầu trang trước khi chuyển trang
        setCurrentStep(currentStep - 1);
    };

    return (
        <div className="container mx-auto my-auto">
            {currentStep === 1 && <SeriesPage goToEposodes={goToNextStep} />}
            {currentStep === 2 && <EpisodesPage goToPreviousStep={goToPreviousStep} />}
        </div>

    );
}

export default CreateVideoPage;
