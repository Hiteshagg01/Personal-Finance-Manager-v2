import "dotenv/config";
import app from "./app.js";

app.listen(process.env.PORT || 8080, (err) => {
  if (err) {
    return console.error(`🚫  failed to connect to server:${err}`);
  }
  console.log(`⚙️  Server is running on port: ${process.env.PORT}`);
});
