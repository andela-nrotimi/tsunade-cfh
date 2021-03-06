/**
 * Module dependencies.
 */
const should = require('should'),
  // app = require(__dirname + 'server.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');


// Globals
let user;
let successDeletedb = false;

// The tests
describe('<Unit Test>', () => {
  describe('Model User:', () => {
    before((done) => {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });
      successDeletedb = true;
      done();
    });

    describe('Method Save', () => {
      it('should be able to save whithout problems',
        () => user.save((err) => {
          should.not.exist(err);
        }));

      it('should be able to show an error when try to save witout name',
        () => {
          user.name = '';
          return user.save((err) => {
            should.exist(err);
          });
        });
    });

    after((done) => {
      if (successDeletedb) {
        mongoose.connection.db.dropDatabase(done);
      } else {
        done();
      }
    });
  });
});
