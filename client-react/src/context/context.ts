import * as React from 'react';

export default React.createContext({
    isAuthenticatedUser: false,
    setIsAuthenticatedUser: (value: any) => {},
})