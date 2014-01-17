/*
 * File: app/store/RiskMainLocal.js
 *
 * This file was generated by Sencha Architect version 2.2.3.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Mob2.store.RiskMainLocal', {
    extend: 'Ext.data.Store',

    requires: [
        'Mob2.model.RiskMain'
    ],

    config: {
        model: 'Mob2.model.RiskMain',
        storeId: 'RiskMainLocal',
        proxy: {
            type: 'localstorage',
            id: 'riskMainLocal'
        }
    }
});