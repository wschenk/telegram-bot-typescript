import { Telegraf } from "telegraf";
import process from "node:process";
import dotenv from "dotenv";

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

bot.telegram.getMe().then((botInfo) => {
  console.log("Bot info:", botInfo);
});

// Define the list of commands
const commands = [
  { command: "start", description: "Start the bot" },
  { command: "info", description: "Get information about the bot" },
  { command: "time", description: "Get current time" },
];

// Set the commands when the bot starts
bot.telegram.setMyCommands(commands);

// Start command
bot.start((ctx) => {
  const user = ctx.update.message?.from;

  console.log("Got a message from", user.first_name, user.last_name, user.id);
  ctx.reply("Welcome! I am your new Telegram bot.");
});

// '/info' command
bot.command("info", (ctx) => {
  console.log("ctx", ctx);
  ctx.reply("This is an information bot.");
});

// '/time' command
bot.command("time", (ctx) => {
  const now = new Date();
  ctx.reply(`Current time: ${now.toLocaleString()}`);
});

// Echo message back
bot.on("text", (ctx) => ctx.reply(ctx.message.text));

// Error handling
bot.catch((err, ctx) => {
  console.error(`Error occurred for user ${ctx.from?.id}:`, err);
  ctx.reply("An error occurred. Please try again later.");
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
