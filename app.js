const express = require('express');
const app = express();
const cors = require("cors")
const todoRoutes = require("./routes/todoRoute");

app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`backend server is running on port ${PORT}`);
});
