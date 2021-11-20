const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  //   .sync({ focus: true })
  .sync()
  .then((result) => {
    User.findByPk(1)
      .then((user) => {
        if (!user) {
          return User.create({ name: "Join", email: "test@gmail.com" });
        }
        return user;
      })
      .then((user) => {
        return user
          .getCart()
          .then((cart) => {
            if (!cart) {
              return user.createCart();
            }
            return cart;
          })
          .catch((err) => console.log(err));
      })
      .then((cart) => app.listen(3000))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
