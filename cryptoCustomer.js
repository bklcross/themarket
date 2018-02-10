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

connection.connect(function(err)
{
  if (err)
  {
    console.log(err);
  }
  showCrypto();
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