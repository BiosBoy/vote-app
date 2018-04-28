import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaltView;

global.decodeURIComponent = doc;
global.window = win;

Object.keys(window).forEach((key) => {
    if (!(key in global)) {
      global[key] = window[key];
    }
});

chai.use(chaiImmutable);