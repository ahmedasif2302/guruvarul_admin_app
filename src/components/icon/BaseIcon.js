import React from 'react';
const BaseIcon = ({ iconName, size, color, style }) => {
    return (
        <>
            <i
                className={iconName}
                style={{
                    fontSize: !!size ? size : null,
                    color: !!color ? color : null,
                    ...style
                }}
            />
        </>
    );
};

BaseIcon.defaultProps = {
    size: null
}

export default BaseIcon;
