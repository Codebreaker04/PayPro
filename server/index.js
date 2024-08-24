const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
const mainRouter = require("./routes/index");

app.use("/api/v1", mainRouter);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// module.exports = router;
