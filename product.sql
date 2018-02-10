CREATE DATABASE IF NOT EXISTS bkl_exchange;
USE bkl_exchange;

DROP TABLE IF EXISTS cryptos;

CREATE TABLE cryptos
(
  item_id INT AUTO_INCREMENT NOT NULL,
  coin_name VARCHAR(100),
  coin_type VARCHAR(100),
  price DECIMAL(10,2),
  circulating_supply BIGINT,
  PRIMARY KEY (item_id)
);

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('TRX', 'Asset', 0.03, 65748192476);

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('BTC', 'Currency', 7362.85, 16850675);

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('ADA', 'Platform', 0.34, 25927070538 );

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('XRP', 'Asset', 0.73, 39009215838);

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('XLM', 'Asset', 0.34, 18432101690);

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('ETH', 'Platform', 738.11, 97459891);

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('BCH', 'Platform', 914.69, 16953725);

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('LTC', 'Currency', 135.35, 55105883);

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('XMR', 'Privacy', 194.40, 15692448);

INSERT INTO cryptos (coin_name, coin_type, price, circulating_supply)
values ('XVG', 'Privacy', 0.05, 14564842488);