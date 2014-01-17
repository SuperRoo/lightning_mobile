/*
 * File: app/view/RiskConDetail.js
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

Ext.define('Mob2.view.RiskConDetail', {
    extend: 'Ext.form.Panel',

    config: {
        title: 'Contractor Signature',
        itemId: 'RiskConDetail',
        items: [
            {
                xtype: 'textfield',
                itemId: 'txtDetail',
                label: 'Name',
                name: 'name',
                placeHolder: 'enter name'
            },
            {
                xtype: 'signaturefield',
                itemId: 'txtSignature',
                label: 'Signature'
            },
            {
                xtype: 'hiddenfield',
                itemId: 'id',
                name: 'id'
            },
            {
                xtype: 'hiddenfield',
                itemId: 'appointmentID',
                name: 'appointmentID'
            },
            {
                xtype: 'hiddenfield',
                itemId: 'Mode',
                name: 'mode'
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                itemId: 'mytoolbar11',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'cmdConSave',
                        ui: 'round',
                        text: 'save'
                    },
                    {
                        xtype: 'button',
                        itemId: 'cmdConDelete',
                        ui: 'round',
                        text: 'delete'
                    }
                ]
            }
        ]
    }

});