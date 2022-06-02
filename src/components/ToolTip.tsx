import { useState } from "react";

interface ToolTipProps extends React.HTMLProps<HTMLDivElement>{
    tip: string;
    position?: 'absolute' | 'relative' | 'fixed' | 'static' | 'sticky';
}
// CHILDREN HAS TO BE IN POSITION RELATIVE!
function TooolTip({ children, tip, position='relative',...props }: ToolTipProps) {
    const [toolTipVisible, setToolTipVisible] = useState(false);

    return ( 
        <>
            <style>{`
                .tool-tip {
                    position: absolute;
                    transform: translateY(-100%);
                    top: 0;
                    left:  0;
                    font-size: 12px;                    
                    width:  100%;
                    max-height: 150px;
                    overflow-y: auto;
                    min-width: 80px;
                    word-wrap: break-word;
                    background-color: #464545;
                    color: white;
                    z-index: 400;
                    padding: 10px;
                    border-radius: 5px;
                }
                .tool-tip-triangle {
                    z-index: 300;
                    position: absolute;
                    bottom: -17px;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 20px solid #464545;
                }
            `}</style>
            <div 
                style={{position: position, display: 'inline-block', margin: 0, width: 'fit-content'}} 
                onMouseOver={() => setToolTipVisible(true)}       
                onMouseLeave={() => setToolTipVisible(false)}
            >
                {toolTipVisible &&
                    <div className="tool-tip">
                        {tip}
                    </div> 
                }
                {children}
            </div>
        </>
    );
}

export default TooolTip;