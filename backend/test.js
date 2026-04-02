const bcrypt = require('bcrypt');

(async () => {
  const password = "admin123";

  const hash = await bcrypt.hash(password, 10);
  console.log("HASH:", hash);

  const match = await bcrypt.compare(password, hash);
  console.log("MATCH:", match); // MUST be true
})();