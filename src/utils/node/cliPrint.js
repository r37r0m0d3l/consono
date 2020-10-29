export default function cliPrint(message, stdout = false) {
  if (!stdout) {
    console.log(message);
  } else {
    process.stdout.write(message);
  }
}
