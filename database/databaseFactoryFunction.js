module.exports = function databaseManipulation(db){

    async function givenCategories(){
       const storedCategories = await db.manyOrNone('select * from category_information;')
       return storedCategories;
    }

    async function storingExpense(username, category, date, cost){ 
        const insertingExpenseInformation = 'INSERT INTO expense_information(users_id, categorys_id, added_on, cost) VALUES ($1,$2,$3,$4);';
        await db.none(insertingExpenseInformation,[username, category, date, cost || 1])   
    }

    async function expenseInformation(){
        const extractingInformation = "SELECT *, to_char(added_on,'Day') AS day FROM expense_information join category_information ON expense_information.categorys_id = category_information.id join users_information ON users_information.id = expense_information.users_id WHERE users_information.id = $1;";
        const storedInfo = await db.manyOrNone(extractingInformation);
        return storedInfo;

    }

    async function storingUserInformation(username,code){
        const insertingUserInfo = 'INSERT INTO users_information(username, code) VALUES ($1,$2);';
        await db.none(insertingUserInfo, [username,code])
    }

    async function checkingExistingUsers(username){
        const findUser = 'SELECT count(*) from users_information WHERE username = $1;';
        const result = await db.one(findUser, [username]);
        return result.count;
    }

    async function codeVerification(code){
        const checkingPassword = 'SELECT * FROM users_information where code = $1;';
        const userCode = await db.oneOrNone(checkingPassword, [code]);
        return userCode;
    }

    

    // async function storingFirstName(firstname, secondname, email){
    //     const insertingUserInformation = await db.any('SELECT * FROM users_information WHERE firstname = $1;', [firstname])
    //     if(insertingUserInformation.length === 0){
    //         await db.any('INSERT INTO users_information (firstname ,secondname , email) VALUES ($1,$2,$3);',[firstname, secondname, email])
    //     }
        
    // }

    // async function gettingStoredNames(){
    //     const storedNames = await db.any("SELECT firstname FROM users_information;")
    //     return storedNames;
    // }

    // async function getUserName(firstname){
    //     const checkingUsername = await db.oneOrNone("SELECT firstname FROM users_information WHERE firstname = $1;", [firstname])
    //     if(checkingUsername.length === 0){
    //         return false;
    //     }
    //     else{
    //         return true;
    //     }
        
    // }

    // async function storingExpenseInfo(firstname,catagory, date, cost){
    //     let userId = await db.oneOrNone('SELECT userid FROM users_information WHERE firstname=$1', [firstname])
    //     let categoryid = await db.oneOrNone('SELECT catagory_id from catagory_information WHERE category=$1', [catagory]) 

    //     await db.any('INSERT INTO expense_information(userid, category_id, cost, date) values($1, $2, $3, $4)', [userId.userid, categoryid.catagory_id, cost, date]);
    // }
    

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
        // storingFirstName,
        // gettingStoredNames,
        // storingExpenseInfo,
        // getUserName
        // storingSecondName,
        // storingEmail
        storingExpense,
        givenCategories,
        expenseInformation,
        storingUserInformation,
        checkingExistingUsers,
        codeVerification

    }
}