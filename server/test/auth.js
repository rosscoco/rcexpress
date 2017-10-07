import test from 'tape';
import request from 'supertest';
import {logger} from '../src/util';
import app from '../src/app';
import {thinky, r} from '../src/db';

thinky.dbReady().then(() => {
    test('Should fail to register with mismatched passwords', (t) => {
        request(app)
            .post('/api/register')
            .send({login: 'test', password: '123', repeatPassword: '1234'})
            .expect(400)
            .end((err) => {
                t.error(err, 'No Error');
                t.end();
            });
    });


    test('Tear down', ((t) => {
        logger.info(thinky.r);
        setImmediate(r.getPoolMaster.drain());
        t.end();
    }));
});

