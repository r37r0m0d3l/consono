export default function processExit(code = 0) {
  if (code === false) {
    return;
  }
  if (code === true) {
    code = 0;
  }
  const exitCode = Number.parseInt(code.toString());
  if (!Number.isInteger(exitCode)) {
    return;
  }
  if (exitCode < 0) {
    return;
  }
  try {
    process.exit(exitCode);
  } catch (error) {
    //
  }
}
