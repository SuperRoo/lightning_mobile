/*
 * File: app/view/panRiskTask.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Mob2.view.panRiskTask', {
    extend: 'Ext.Panel',

    config: {
        scrollable: 'vertical',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                scrollable: false,
                title: 'Risk Task',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'cmdBack',
                        ui: 'back',
                        text: 'back'
                    }
                ]
            },
            {
                xtype: 'textfield',
                itemId: 'txtName',
                label: 'Name'
            },
            {
                xtype: 'component',
                height: '30px',
                html: '<span style=\'valign:middle;\'>Hazard</span>',
                itemId: 'lbllHazard'
            },
            {
                xtype: 'list',
                height: '150px',
                itemId: 'lstHazard',
                itemTpl: [
                    '<div>{Description}</div>'
                ],
                store: 'strRiskList'
            },
            {
                xtype: 'component',
                height: '30px',
                html: '<span style=\'valign:middle;\'>Risks</span>',
                itemId: 'lblRisks'
            },
            {
                xtype: 'list',
                height: '150px',
                itemId: 'lstRisks',
                itemTpl: [
                    '<div>{Description}</div>'
                ],
                store: 'strRiskList'
            },
            {
                xtype: 'textfield',
                itemId: 'txtRating',
                label: 'Rating'
            },
            {
                xtype: 'component',
                height: '30px',
                html: '<span style=\'valign:middle;\'>Measures</span>',
                itemId: 'lblMeasures'
            },
            {
                xtype: 'list',
                height: '150px',
                itemId: 'lstMeasures',
                itemTpl: [
                    '<div>{Description}</div>'
                ],
                store: 'strRiskList'
            },
            {
                xtype: 'textfield',
                itemId: 'txtHierarchy',
                label: 'Hierarchy'
            },
            {
                xtype: 'textfield',
                itemId: 'txtResidual',
                label: 'Residual'
            },
            {
                xtype: 'component',
                height: '30px',
                html: '<span style=\'valign:middle;\'>Comments</span>',
                itemId: 'lblComments'
            },
            {
                xtype: 'textfield',
                height: '150px',
                itemId: 'txtComments'
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'cmdSave',
                        ui: 'action-round',
                        text: 'save'
                    }
                ]
            }
        ]
    }

});