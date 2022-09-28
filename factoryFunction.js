module.exports = function StoringInformation(){
    var firstNamesContainer = {};
    var lastNamesContainer = {};
    var userEmailsContainer = {};

    function storingFirstNames(firstNames){
        if(firstNamesContainer[firstNames] === undefined){
            firstNamesContainer[firstNames] = 1;
        }
        else{
            firstNamesContainer[firstNames]++;
        }
    }

    function storedFirstNames(){
        return firstNamesContainer;
    }
    
    function storingLastNames(lastNames){
        if(lastNamesContainer[lastNames] === undefined){
            lastNamesContainer[lastNames] = 1;
        }
        else{
            lastNamesContainer[lastNames]++;
        }

    }

    function storedLastNames(){
        return lastNamesContainer;
    }

    function storingUserEmails(userEmails){
        if(userEmailsContainer[userEmails] === undefined){
            userEmailsContainer[userEmails] = 1;
        }
        else {
            userEmailsContainer[userEmails]++
        }

    }

    function storedUserEmails(){
        return userEmailsContainer;
    }


    return{
        firstNamesContainer,
        storingFirstNames,
        storedFirstNames,
        storingLastNames,
        storedLastNames,
        storingUserEmails,
        storedUserEmails,
        lastNamesContainer,
        userEmailsContainer


    }
}