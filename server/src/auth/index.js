import './passport';
import login from './login';
import register from './register';

//initializ login and register routes with express
export default (app) => {
    login(app);
    register(app);
};
