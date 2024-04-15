import React from 'react';
import MDButton from './MDButton';

const AnimatedButton=({children,clickHandler})=>{
    return (
      <MDButton variant="gradient" onClick={clickHandler} color={"dark"}>{children}</MDButton>
    );
}

export default AnimatedButton;
