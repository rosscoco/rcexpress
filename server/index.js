//one of the ways you can use Babel is through the require hook. The require hook will bind itself to node’s require and automatically compile files on the fly. T
require('babel-register');
require('./src');
