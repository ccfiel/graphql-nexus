import { extendType, objectType, stringArg } from "nexus";
import { PrismaClient } from "@prisma/client";
import { JSONScalar } from ".";
const prisma = new PrismaClient();

export const AnalyticsCashBalances = objectType({
  name: "AnalyticsCashBalances",
  definition(t) {
    t.string("amount");
    t.string("balance");
    t.string("comment");
    t.field("createdAt", {
      type: JSONScalar,
    });
    t.string("customer");
    t.string("posName");
    t.string("shiftee");
    t.string("type");
  },
});

export const AnalyticsItemsAddOnsList = objectType({
  name: "AnalyticsItemsAddOnsList",
  definition(t) {
    t.int("baseQty");
    t.field("cost", {
      type: JSONScalar,
    });
    t.string("id");
    t.string("itemId");
    t.string("key");
    t.boolean("managedStocks");
    t.string("name");
    t.field("price", {
      type: JSONScalar,
    });
    t.int("qty");
    t.field("rate", {
      type: JSONScalar,
    });
    t.int("sortId");
    t.string("unit");
  },
});

export const AnalyticsItems = objectType({
  name: "AnalyticsItems",
  definition(t) {
    t.list.field("addOnsList", {
      type: AnalyticsItemsAddOnsList,
    });
    t.field("addOnsPrice", {
      type: JSONScalar,
    });
    t.field("amount", {
      type: JSONScalar,
    });
    t.string("cashier");
    t.string("cashierId");
    t.field("createdAt", {
      type: JSONScalar,
    });
    t.field("discount", {
      type: JSONScalar,
    });
    t.boolean("hasSeniorPwd");
    t.int("id");
    t.string("item");
    t.string("itemId");
    t.string("parentItem");
    t.string("posName");
    t.field("qty", {
      type: JSONScalar,
    });
    t.field("rate", {
      type: JSONScalar,
    });
    t.string("refId");
    t.boolean("refund");
    t.field("tax", {
      type: JSONScalar,
    });
  },
});

export const AnalyticsPaymentsPayments = objectType({
  name: "AnalyticsPaymentsPayments",
  definition(t) {
    t.int("amount");
    t.string("name");
    t.string("paymentType");
    t.string("refNo");
  },
});

export const AnalyticsPayments = objectType({
  name: "AnalyticsPayments",
  definition(t) {
    t.int("addedTax");
    t.field("amount", {
      type: JSONScalar,
    });
    t.field("amountBalance", {
      type: JSONScalar,
    });
    t.field("amountDue", {
      type: JSONScalar,
    });
    t.field("amountReceived", {
      type: JSONScalar,
    });
    t.string("cashier");
    t.string("cashierId");
    t.field("createdAt", {
      type: JSONScalar,
    });
    t.nullable.int("customerDiscount");
    t.field("diningOptionFee", {
      type: JSONScalar,
    });
    t.field("discounts", {
      type: "JSON",
    });
    t.field("includedTax", {
      type: JSONScalar,
    });
    t.string("paymentMode");
    t.list.field("payments", {
      type: AnalyticsPaymentsPayments,
    });
    t.string("posName");
    t.string("refId");
    t.boolean("refund");
    t.field("seniorPwdDiscount", {
      type: JSONScalar,
    });
    t.field("serviceFee", {
      type: JSONScalar,
    });
    t.field("vatAmount", {
      type: JSONScalar,
    });
  },
});

export const AnalyticsShiftees = objectType({
  name: "AnalyticsShiftees",
  definition(t) {
    t.field("endShift", {
      type: JSONScalar,
    });
    t.string("posName");
    t.field("sales", {
      type: JSONScalar,
    });
    t.string("shiftee");
    t.field("startShift", {
      type: JSONScalar,
    });
  },
});

export const AnalyticsTimeEntries = objectType({
  name: "AnalyticsTimeEntries",
  definition(t) {
    t.field("datetime", {
      type: JSONScalar,
    });
    t.string("employeeId");
    t.boolean("isTimeIn");
  },
});

export const Analytics = objectType({
  name: "Analytics",
  definition(t) {
    t.string("id");
    t.string("firebaseId");
    t.string("userId");
    t.list.field("cashBalances", {
      type: "AnalyticsCashBalances",
    });
    t.list.field("items", {
      type: "AnalyticsItems",
    });
    t.nullable.list.field("payments", {
      type: "AnalyticsPayments",
    });
    t.nullable.list.field("shiftees", {
      type: "AnalyticsShiftees",
    });
    t.nullable.list.field("timeEntries", {
      type: "AnalyticsTimeEntries",
    });
    t.string("sourceData");
    t.int("transactions");
  },
});

export const AnalyticQuery = extendType({
  type: "Query",
  definition(t) {
    // //GET
    // t.nonNull.list.nonNull.field("feed", {
    //   type: "Analytics",
    //   async resolve(parent, args, context, info) {
    //     const allData = await prisma.analytics.findMany();
    //     return allData;
    //   },
    // });

    //Resolver for 'analyticsByUserId' Field with Filtering by userId and date
    t.field('analyticsByUserId', {
      type: 'Analytics',
      args: {
        userId: stringArg(), 
        date: stringArg(),
      },
      async resolve(parent, args, context, info) {
        const { userId, date } = args; 
        const where = userId && date ? { userId: userId, firebaseId: date } : {}

        const userData = await prisma.analytics.findFirst({
          where: where,
        });
        return userData;
      },
    });
  },
});
