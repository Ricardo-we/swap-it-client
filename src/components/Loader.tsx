function Loader() {
    return (
        <>
            <style>{`
            .loader-container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #3ecb3c10;
            }

        `}</style>
            <div className="loader-container">
                <LoaderIcon/>
            </div>
        </>
    );
}

export const LoaderIcon = () => {
    return (
        <>
        <style>{`
            .load-row {
                width: 100px;
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 0;
                margin: auto;
                height: 50px;
                line-height: 50px;
                text-align: center;
            }
              
            .load-row span {
                display: inline-block;
                width: 10px;
                height: 10px;
                background: #f76002;
                border-radius: 50px;
                animation: up-down6 0.5s ease-in infinite alternate;
            }
            
            .load-row span:nth-child(2) {
                background: #e85b04c4;
                animation-delay: 0.16s;
            }
            
            .load-row span:nth-child(3) {
                background: #e85b0491;
                animation-delay: 0.32s;
            }
            
            .load-row span:nth-child(4) {
                background: #e85b0456;
                animation-delay: 0.48s;
            }
            
            @keyframes up-down6 {
                0% {
                    transform: translateY(-10px);
                }
                
                100% {
                    transform: translateY(10px);
                }
            }
        `}</style>
            <div className="load-row">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </>
    );
}

export default Loader;