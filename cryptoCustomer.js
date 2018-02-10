const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');


var connection = mysql.createConnection(
{
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Iplay2win",
  database: "bkl_exchange"
});

function showCrypto()
{
    console.log("Welcome to the bkl_EXCHANGE\n");
    connection.query("SELECT * FROM cryptos", function(err, res)
    {
      if (err)
      {
      console.log(err);    
      }
      console.table(res);
      connection.end();
    });
}

connection.connect(
function(err)
{
  if (err)
  {
    console.log(err);
  }
  showCrypto();

  function questions (params)
  {
    inquirer.prompt(
    [{
      name: "item_number",
      type: "input",
      message: "Please input item_id of the crypto you want."
    }])
    .then(answers =>
    {
      console.log(answers);
    });
  }
});


