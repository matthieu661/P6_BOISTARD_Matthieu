  
module.exports = {
    ValideString: function (x) {
        const testString = /^[a-z0-9-éèàäùüç/s/ ]+$/; // pas caractéres spéciaux(accents ok)
        return testString.test(x)
    },
    ValidationEmail : function (x) {
        const testEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // pas caractéres spéciaux(accents ok)
        return testEmail.test(x)
    },
    ValidationPassword : function (x) {
        const testPassword = /^[a-z0-9-éèàäùüç/s/ ]{10,}$/; // pas caractéres spéciaux(accents ok) + length min()
        return testPassword.test(x)
    }
  
}
  
  

  