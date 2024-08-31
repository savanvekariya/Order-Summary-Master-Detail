sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, Filter, FilterOperator, FilterType, JSONModel) {
        "use strict";

        return Controller.extend("masterdetail.masterdetail.controller.View1", {
            onInit: function () {

            },

            onListPress: function (oEvent) {
                let orderID = oEvent.getParameter("listItem").getBindingContext().getProperty("OrderID")
            },
            onListPress1: function (oEvent) {
                let orderID = oEvent.getSource().getBindingContext().getProperty("OrderID")
                let oFilter = new Filter("OrderID", FilterOperator.EQ, orderID)
                this.getView().byId("orderTable").getBinding("items").filter(oFilter, FilterType.Application)
                this.getSplitContObj().to(this.createId("orderDetail"))
            },

            onPressOrderDetail: function (oEvent) {
                let that = this
                let productId = oEvent.getSource().getBindingContext().getProperty("ProductID")
                let oModel = this.getOwnerComponent().getModel()
                oModel.read(`/Products(${productId})`, {
                    success: function (oData) {
                        let jData = new JSONModel(oData)
                        that.getView().byId("productForm").setModel(jData)
                        that.getSplitContObj().to(that.createId("productDetail"))

                    },
                    error: function (oError) {
                        console.log(oError)
                    }
                })
            },

            getSplitContObj: function () {
                let result = this.byId("SplitCont")
                return result
            },
            onProductBack: function(){
                this.getSplitContObj().backDetail();
            }


        });
    });
