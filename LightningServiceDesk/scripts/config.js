Ext.define('Mob2.Config', {
    singleton : true,
    config : {
        urls : {
            main : 'http://lightningstar1.net/MobileSvc/',
            root : 'http://lightningstar1.net/'
       }
       //devmy.star1vn.com
       //localhost/Lightning_My
       //lightningstar1.net
    },
    constructor: function(cfg) {        
        this.initConfig(cfg);
        return this;    
    }
});