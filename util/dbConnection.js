const mongoose = require("mongoose");

module.exports = () => [
  mongoose
    .connect(
      "mongodb+srv://admin-ashick:md.aashiq.2801@cluster0.vce2n.mongodb.net/amazon?retryWrites=true&w=majority",
      {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    )
    .then(() => console.log("Db Connection sucesss"))
    .catch((e) => {
      console.log(e);
    }),
];
