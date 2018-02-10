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
  //connection.end();
});

function showCrypto()
{
    console.log("Welcome to the bkl_EXCHANGE\n");
    connection.query("SELECT * FROM cryptos", function(err, res)
    {
      if (err) throw err;
      console.table(res);

      questions();
      // CallBack();
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
        connection.end();
      }
      else
      {
        update(answers.itemNum, answers.quant);
      }
    })
  })
}

function update(itm,qty)
{ 
  var connectQuery = "UPDATE cryptos SET circulating_supply = circulating_supply - " + qty + " WHERE item_id = " + itm;
  var current_circulating_supply = 0;

  console.log("Item:", itm);
  console.log("Quantity:", qty);

  connection.query(connectQuery, function(err, res)
  {
    if (err) throw err
      
    else
      {
        console.log("Your order has been processed");
        getCirculatingSupply(itm);
      }
  });
}

function getCirculatingSupply(id)
{
  connection.query("SELECT circulating_supply FROM cryptos WHERE ?", [id], function(err, res)
  {
    if (err) throw err;
    else {
      current_circulating_supply = res[0].circulating_supply;
      console.log("Current Circulating Supply:", current_circulating_supply);
      connection.end();
    }
  });
};

