import React from 'react';

const Container = ({children}) => {
    return(
        <div className="max-w-screen-lg mt-2 glass-card ">
            {children}
        </div>
    )

}

export default Container;