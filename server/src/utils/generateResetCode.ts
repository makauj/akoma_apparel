export default function generateResetCode(length = 6): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
