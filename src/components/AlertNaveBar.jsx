import React from 'react';

const AlertNaveBar = () => {
    return (
        <>
            <div className="flex fixed bg-[#000] z-50 w-full h-screen flex-col">
                <div className="close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V7C18 5.89543 17.1046 5 16 5H8C6.89543 5 6 5.89543 6 7V19Z" />
                    </svg>
                </div>
                <nav>
                    <ul className="flex gap-4">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default AlertNaveBar;
