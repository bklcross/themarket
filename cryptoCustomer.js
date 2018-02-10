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
  if (err) {console.log(err);}

  showCrypto();

  questions();

  connection.end();

});

function showCrypto()
{
    console.log("Welcome to the bkl_EXCHANGE\n");
    connection.query("SELECT * FROM cryptos", function(err, res)
    {
      if (err) throw err;
      console.table(res);
    });
}

function questions()
{
  inquirer.prompt([
  {
    name: "itemNum",
    type: "input",
    message: "Which crypto do you want to buy?"
  },
  {
    name: "quant",
    type: "input",
    message: "How many coins should you like purchase?"
  }
  ]).then(answers =>
  {
    console.log("Item:", answers.itemNum);
    console.log("Quantity:", answers.quant);
    connection.query("SELECT circulating_supply FROM cryptos WHERE item_id = ?", [answers.itemNum], function(err, res, fields)
    {
      if (err) throw err
      else
      {
        if (answers.itemNum > 10)
        {
          console.log("That crypto is not included in this exchange");
        }
        else
        {
          if (answers.quant > res.circulating_supply)
          {
            console.log("Sorry the exchange doesn't have enough");
          }
        }
      }
    });
  });
}