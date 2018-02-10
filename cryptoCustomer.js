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
  showCrypto(questions);
  connection.end();
});

function showCrypto(CallBack)
{
    console.log("Welcome to the bkl_EXCHANGE\n");
    connection.query("SELECT * FROM cryptos", function(err, res)
    {
      if (err) throw err;
      console.table(res);
      CallBack();
    });
    

}

function questions(CallBack)
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
    message: "How many coins would you like purchase?"
  }
  ]).then(function(answers)
  {
    var connectQuery1 = "SELECT * FROM cryptos WHERE item_id="+ answers.itemNum
    connection.query(connectQuery1, function(err, res)
    {
      if (answers.quant > res[0].circulating_supply)
      {
        console.log("Sorry the exchange doesn't have enough");
      }
    })
    CallBack();
  })
}

function update()
{ 
  var Quantity = answers.quant;
  var Item = answers.itemNum;
  var connectQuery = "UPDATE cryptos SET circulating_supply = circulating_supply - " + Quantity + " WHERE item_id = " + Item;
  var current_circulating_supply = 0;

  console.log("Item:", answers.itemNum);
  console.log("Quantity:", answers.quant);

  connection.query(connectQuery, function(err, res)
  {
    if (err) throw err
      
    else
      {
        console.log("Your order has been processed");
        getCirculatingSupply(Quantity);
      }
  });
}

function getCirculatingSupply(quantity)
{
  connection.query("SELECT circulating_supply FROM cryptos WHERE ?", [{ item_id: quantity}], function(err, res)
  {
    if (err) throw err;
    else {
      current_circulating_supply = res[0].circulating_supply;
      console.log("Current Circulating Supply:", current_circulating_supply);
    }
  });
};

