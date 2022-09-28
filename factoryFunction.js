module.exports = function StoringInformation(){
    var firstNamesContainer = {};
    var lastNamesContainer = {};
    var userEmailsContainer = {};
    var catagories = {};
    var dateOfCatagory = {};
    var costOfCatagoryContainer = {} 

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

    function storingTypeCatagory(catagory){
        if(catagories[catagory] === undefined){
            catagories[catagory] = 1;
        }
        else{
            catagories[catagory]++;
        }

    }

    function availableCatagory(){
        return catagories;
    }

    function storingTheDate(date){
        if(dateOfCatagory[date] === undefined){
            dateOfCatagory[date] = 1;
        }
        else{
            dateOfCatagory[date]++;
        }
    }

    function availableDates(){
        return dateOfCatagory;
    }

    function storingTheCatagoryCost(cost){
        if(costOfCatagoryContainer[cost] === undefined){
            costOfCatagoryContainer[cost] = 1;
        }
        else{
            costOfCatagoryContainer[cost]++;
        }
    }

    function storedCost(){
        return costOfCatagoryContainer;
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
        userEmailsContainer,
        storingTypeCatagory,
        availableCatagory,
        catagories,
        storingTheDate,
        availableDates,
        dateOfCatagory,
        costOfCatagoryContainer,
        storingTheCatagoryCost,
        storedCost
    }
}