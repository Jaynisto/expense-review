module.exports = function databaseManipulation(db){

    async function storingFirstName(firstname, secondname, email){
        const insertingUserInformation = await db.any('SELECT * FROM users_information WHERE firstname = $1;', [firstname])
        if(insertingUserInformation.length === 0){
            await db.any('INSERT INTO users_information (firstname ,secondname , email) VALUES ($1,$2,$3);',[firstname, secondname, email])
        }
        
    }

    async function gettingStoredNames(){
        const storedNames = await db.any("SELECT firstname FROM users_information;")
        return storedNames;
    }

    async function storingExpenseInfo(firstname,catagory,cost,date){
        let userId = await db.one('SELECT userid FROM users_information WHERE firstname=$1', [firstname])
        let categoryid = await db.one('SELECT catagory_id from catagory_information WHERE category=$1', [catagory]) 

        await db.none('INSERT INTO expense(usersId, categoryid, cost, date) values($1, $2, $3, $4)', [userId.userid, categoryid.catagory_id, cost, date]);
    }
    

    // async function storingSecondName(secondname){
    //     const insertingSecondName = await db.any('SELECT secondname FROM users_information WHERE secondname = $1;', [secondname])
    //     if(insertingSecondName.length === 0){
    //         await db.any('INSERT INTO users_information (secondname) VALUES ($1);',[secondname])
    //     }
        
    // }

    // async function storingEmail(email){
    //     const insertingUserEmail = await db.any('SELECT email FROM users_information WHERE email = $1;', [email])
    //     if(insertingUserEmail.length === 0){
    //         await db.any('INSERT INTO users_information (email) VALUES ($1);',[email])
    //     }
        
    // }

    return{
        storingFirstName,
        gettingStoredNames,
        storingExpenseInfo
        // storingSecondName,
        // storingEmail

    }
}