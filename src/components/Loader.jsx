import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => (
  <div style={{ height: 'inherit' }}
    class="text-center align-items-center">
    <CircularProgress style={{ marginTop: 200, color: '#343a40' }} size={75} /></div>

);

export default Loader;