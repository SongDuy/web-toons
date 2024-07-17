import React from 'react';

import HeaderPage from './header'
import ContentPage from './content'
import FooterPage from './footer'

const HomePage = () => {
    return (
        <div>
            <HeaderPage />

            <ContentPage />
            
            <FooterPage />
        </div>
    );
}

export default HomePage;
