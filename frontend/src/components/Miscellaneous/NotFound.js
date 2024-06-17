import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../lottie animations/404-animation.json';

const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                    style={{ height: '300px', width: '300px' }}
                />
                <h1>404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default NotFound;
