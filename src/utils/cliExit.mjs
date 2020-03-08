export default function cliExit() {
  if ("clear" in console) {
    try {
      console.clear();
    } catch (err) {
      //
    }
  } else {
    try {
      process.stdout.write("\u001b[2J\u001b[0;0H");
    } catch (err) {
      //
    }
  }
}
