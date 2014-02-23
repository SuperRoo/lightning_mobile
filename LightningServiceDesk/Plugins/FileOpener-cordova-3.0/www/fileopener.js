
module.exports = {

    open: function (url, success, failure) {
        if (!success) {
        	success = function () {
            	console.log("success!");
        	};
        }
        if (!failure) {
        	failure = function (error) {
            	console.log(error);
            };
        }
        cordova.exec(success, failure, "FileOpener", "openFile", [url]);
    }

}
