import React from 'react';

const Container = ({children}) => {
    return(
        <div className="max-w-screen-lg mt-2 glass-card min mx-4 w-full">
            {children}
        </div>
    )

}

export default Container;