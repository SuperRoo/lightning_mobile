/*
 * File: app/view/ContractorDetail.js
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

Ext.define('Mob2.view.ContractorDetail', {
    extend: 'Ext.form.Panel',

    requires: [
        'Mob2.view.txtReadOnly'
    ],

    config: {
        title: 'Contractor',
        itemId: 'ContractorDetail',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                itemId: 'titleBar'
            },
            {
                xtype: 'textfield',
                itemId: 'txtName',
                label: 'Name',
                name: 'name',
                placeHolder: 'enter name'
            },
            {
                xtype: 'txtreadonly',
                itemId: 'txtStart',
                label: 'Start',
                name: 'startTime',
                placeHolder: 'tap to set'
            },
            {
                xtype: 'txtreadonly',
                itemId: 'txtEnd',
                label: 'End',
                name: 'endTime',
                placeHolder: 'tap to set'
            },
            {
                xtype: 'togglefield',
                height: '50px',
                itemId: 'tglConOvernight',
                style: 'valign:middle;',
                label: 'Overnight',
                name: 'isOvernight'
            },
            {
                xtype: 'hiddenfield',
                itemId: 'hidID',
                name: 'id'
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                itemId: 'mytoolbar28',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'cmdConDetCancel',
                        ui: 'round',
                        text: 'cancel'
                    },
                    {
                        xtype: 'button',
                        itemId: 'cmdConDetSave',
                        ui: 'round',
                        text: 'add'
                    },
                    {
                        xtype: 'button',
                        itemId: 'cmdConDetDelete',
                        ui: 'round',
                        text: 'delete'
                    }
                ]
            }
        ]
    }

});