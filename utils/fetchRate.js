import axios from "axios";

export const fetchMaticToUSDT = async () => {
  try {
    const cgRes = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
      params: {
        ids: "matic-network",
        vs_currencies: "usdt",
      },
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const cgPrice = cgRes.data?.["matic-network"]?.usdt;
    if (cgPrice) {
      console.log("Rate from CoinGecko:", cgPrice);
      return cgPrice;
    }
  } catch (err) {
    console.warn("CoinGecko failed, trying Binance...");
  }

  try {
    const binanceRes = await axios.get(
      "https://api.binance.com/api/v3/ticker/price?symbol=MATICUSDT"
    );
    const binancePrice = parseFloat(binanceRes.data?.price);
    if (binancePrice) {
      console.log("Rate from Binance:", binancePrice);
      return binancePrice.toFixed(4);
    }
  } catch (err) {
    console.error("Both rate sources failed:", err);
  }

  return "N/A";
};

