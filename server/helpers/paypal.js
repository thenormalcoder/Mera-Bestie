const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AaexbGUMSWTXEm2MuHR6myFOP_bXw9p29ymsoEuaf2f-9fc2fmSEQ74htVFm1NULySR85v2wCaqti6hL",
  client_secret: "EOdf4C634HT6fAL-Uo8aRFyGijAdkwwqk0xeyM7Dl6HDSjE5C5Io7_XW_JhFz_nQ0PuPqKqSVpEyxu2P",
});

module.exports = paypal;
