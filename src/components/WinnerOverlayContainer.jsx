import React from 'react'

export default function WinnerOverlayContainer({ children, isVisible }) {

    return isVisible ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div>
                {children}
            </div>
        </div>
    ) : null;
}
