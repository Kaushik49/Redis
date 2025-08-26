import { createClient } from "redis";

const client = createClient();

async function main() {
  await client
    .connect()
    .then(() => {
      console.log("Connected to Redis");
    })
    .catch((error) => {
      console.error("Failed to connect to Redis:", error);
    });
  while (1) {
    const response = await client.brPop("submissions", 0);
    console.log(response);
    //actually run the users code docker exe
    await new Promise((resolve) => setTimeout(resolve, 1000));
    //send it to pub sub
    console.log("processed user submissions");
  }
}
main();
