import WEB from "../const/web.mjs";

export default function cliPrint(message, stdout = false) {
  if (WEB) {
    console.log(message);
    return;
  }
  if (!stdout) {
    console.log(message);
  } else {
    process.stdout.write(message);
  }
}
