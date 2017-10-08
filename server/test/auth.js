import test from 'tape';
import request from 'supertest';
import {logger} from '../src/util';
import app from '../src/app';
import {thinky} from '../src/db';

thinky.dbReady().then(() => {
    test('Should successfully register user', (t) => {
        request(app)
            .post('/api/register')
            .send({login: 'test', password: '123', passwordRepeat: '123'})
            .expect(201)
            .end((err) => {
                t.error(err, 'No Error Received from Register');
                t.end();
            });
    });

    test('Should fail to register with mismatched passwords', (t) => {
        request(app)
            .post('/api/register')
            .send({login: 'test', password: '123', repeatPassword: '1234'})
            .expect(400)
            .end((err, res) => {
                const expectedBody = {error: 'Passwords do not match!'};
                const actualBody = res.body;

                t.error(err, 'No Error');
                t.deepEqual(expectedBody, actualBody, 'Retrieve Body');
                t.end();
            });
    });

    test((t) => {
        thinky.r.getPoolMaster().drain();
        t.end();
    });
});
