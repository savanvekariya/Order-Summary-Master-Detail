/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"master_detail/master_detail/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
