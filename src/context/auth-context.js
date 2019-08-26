import React from 'react';

// use context to avoid having to pass props down multi level
// almost like a global prop

const authContext = React.createContext({
    authenticated: false,
    login: () => { }
});

export default authContext;