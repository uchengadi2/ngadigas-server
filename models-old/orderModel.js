const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    cartId: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    productCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    productVendor: {
      type: mongoose.Schema.ObjectId,
      ref: "Vendor",
    },
    quantityAdddedToCart: {
      type: Number,
    },
    orderedQuantity: {
      type: Number,
    },
    orderedPrice: {
      type: Number,
    },
    productCurrency: {
      type: mongoose.Schema.ObjectId,
      ref: "Currency",
    },
    productLocation: {
      type: mongoose.Schema.ObjectId,
      ref: "State",
    },
    locationCountry: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
    },
    totalDeliveryCost: {
      type: Number,
    },
    totalProductCost: {
      type: Number,
    },
    recipientName: {
      type: String,
    },
    recipientPhoneNumber: {
      type: String,
    },
    recipientAddress: {
      type: String,
    },
    recipientState: {
      type: mongoose.Schema.ObjectId,
      ref: "State",
    },
    recipientCountry: {
      type: mongoose.Schema.ObjectId,
      ref: "Country",
    },
    dateAddedToCart: {
      type: Date,
    },

    dateOrdered: {
      type: Date,
      default: Date.now,
    },
    orderedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    paymentStatus: {
      type: String,
      enum: ["to-be-confirmed", "paid", "not-processed"],
      default: "to-be-confirmed",
    },
    paymentMethod: {
      type: String,
      enum: ["cheque", "card", "bank-transfer", "cash"],
    },
    status: {
      type: String,
      default: "unprocessed",
      enum: [
        "unprocessed",
        "ready-for-delivery",
        "rejected",
        "assigned-for-delivery",
      ],
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//QUERY MIDDLEWARE
orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
  });
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
