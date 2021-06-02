

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
    MasquageEmail : function(email) { // ne fonctionne pas ! ?? 
        var maskedEmail = email.replace(/([^@\.])/g, "*").split('');
        var previous	= "";
        for(i=0;i<maskedEmail.length;i++){
            if (i<=1 || previous == "." || previous == "@"){
                maskedEmail[i] = email[i];
            }
            previous = email[i];
        }
        return maskedEmail.join('');
    },
    Maskator : function(sentence) {
        if (typeof sentence === "string") {
            let headMail = sentence.slice(0,1);
            let bodyMail = sentence.slice(1, sentence.length-4);
            let bottomMail = sentence.slice(sentence.length-4, sentence.length);
            let final = [];
            var masked = bodyMail.split('');
            var maskedMail = [];
            for(let i in masked) {
              masked[i] = '*';
              maskedMail += masked[i];  
            }
            final += headMail + maskedMail + bottomMail
            return final;
          }
        console.log(email + " is not a mail");
        return false
    }
    
      

  
}


  
  

