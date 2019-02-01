import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const WhiteLoader = () => (
    <div style={{ height: 'inherit' }}
        className="text-center align-items-center">
        <CircularProgress style={{ marginTop: 200, color: '#FFFF' }} size={75} /></div>

);

export default WhiteLoader;