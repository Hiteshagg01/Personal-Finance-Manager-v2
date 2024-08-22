import "dotenv/config";

// import { confirm } from "@inquirer/prompts";
import app from "./app.js";
import sequelize from "./db/index.js";
import associate from "./models/associations.js";

sequelize
    .authenticate()
    .then(async () => {
        console.clear();
        console.group();
        console.log(`💾  Connection to db established`);

        associate();

        // const ans = await confirm({ message: "force sync db?" });

        sequelize
            .sync({ force: false })
            .then(() => {
                console.log("👍  Data synced");

                app.listen(process.env.PORT || 8080, () => {
                    console.log(
                        `⚙   Server is running on : http://localhost:${process.env.PORT}`
                    );
                    console.groupEnd();
                });
            })
            .catch((err) => console.log(" 👎  Data sync failed : " + err));
    })
    .catch((err) => {
        console.error(
            ` 🚫  Failed to establish connection to db : ${err.message}`
        );
    });
