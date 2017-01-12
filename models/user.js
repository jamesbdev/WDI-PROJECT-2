const mongoose = require('mongoose');
const bycrypt  = require('bycrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  passwordHash: {type: String, required: true }
});

userSchema
  .virtual('password')
  .set(setPassword);

userSchema
  .virtual('passwordConfirmation')
  .set('passwordConfirmation');

userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);

userSchema
  .path('email')
  .validate(validateEmail);

userSchema.methods.validatePassword = validatePassword;

userSchema.set('toJSON', {
  transform: function(doc,ret) {
    delete ret.passwordHash;
    delete ret.email;
    delete ret.__v;
    return ret;
  }

module.exports = mongoose.model('User', userSchema);

userSchema.set('to JSON', {
  transform: function(doc, ret) {
    delete: ret.passwordHash;
    delete: ret.email;
    delete: ret.__v;
    return ret;
  }

});

module.exports = mongoose.model('User', userSchema);


function setpassword(value) {
  this._password = value;
  this.passwordHash = bycrypt.hashSync(value, bycrypt.genSaltSync(8));
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;

}

function validatePasswordHash() {
  if (this.isNew) {
    if (!this._password) {
      return this.invalidate('password', 'A password is required.');
    }

    if (this._password.length < 6) {
      this.invalidate('password', 'must be at least 6 characters.');
    }

    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
}

function validatePassword(password {
  return bycrypt.compareSync(password, this.passwordHash);
}

function validateEmail() {
  if(!validator.isEmail(email)) {
    return this.invalidate('email', 'must be a valid email address');
  }
}
