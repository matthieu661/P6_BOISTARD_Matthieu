module.exports = {
    ValideString: function (x) {
        const testString = /^[a-zA-Z0-9-éèàäùüç/s/ ]+$/; // pas caractéres spéciaux(accents ok)
        return testString.test(x)
    },
    ValidationEmail : function (x) {
        const testEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // pas caractéres spéciaux(accents ok)
        return testEmail.test(x)
    },
    ValidationPassword : function (x) {
        const testPassword = /^[a-zA-Z0-9-éèàäùüç/s/ ]{10,}$/; // pas caractéres spéciaux(accents ok) + length min()
        return testPassword.test(x)
    },
    MasquageEmail : function(email) { // voir 
        const maskedEmail = email.replace(/([^@\.])/g, "*").split('');
        const previous	= "";
        for(i=0;i<maskedEmail.length;i++){
            if (i<=1 || previous == "." || previous == "@"){
                maskedEmail[i] = email[i];
            }
            previous = email[i];
        }
        return maskedEmail.join('');
    },
}


  
  

