import React, { FunctionComponent, useState } from 'react';
import RegisterForm from '../components/register-form';
 
  
const FighterAdd: FunctionComponent = () => {
      
  return (
        <div className="row">
            <h2 className="header center">Ajouter un fighter </h2>
            <RegisterForm />
        </div>
  );
}
  
export default FighterAdd;