/*
 * File: app/store/Status.js
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

Ext.define('Mob2.store.Status', {
    extend: 'Ext.data.Store',
    alias: 'store.Status',

    requires: [
        'Mob2.model.Status'
    ],

    config: {
        autoLoad: true,
        model: 'Mob2.model.Status',
        storeId: 'Status',
        proxy: {
            type: 'ajax',
            url: 'data/status.json',
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});