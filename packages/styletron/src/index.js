import StyletronServer from 'styletron-server';
import StyletronClient from 'styletron-client';

const Styletron = __TARGET__ === 'browser' ? StyletronClient : StyletronServer;

export default Styletron;
