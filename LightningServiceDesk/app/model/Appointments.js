/*
 * File: app/model/Appointments.js
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

Ext.define('Mob2.model.Appointments', {
    extend: 'Ext.data.Model',
    alias: 'model.Appointments',

    config: {
        fields: [
            {
                name: 'id',
                type: 'auto'
            },
            {
                name: 'subject',
                type: 'string'
            },
            {
                name: 'duration',
                type: 'int'
            },
            {
                name: 'starttime',
                type: 'string'
            },
            {
                name: 'customer'
            },
            {
                name: 'street'
            },
            {
                name: 'suburb'
            },
            {
                name: 'state'
            },
            {
                name: 'comments'
            },
            {
                name: 'activityStart',
                type: 'string'
            },
            {
                name: 'activityEnd',
                type: 'string'
            },
            {
                name: 'activityStatus',
                type: 'int'
            },
            {
                name: 'activityComment'
            },
            {
                name: 'phone'
            },
            {
                name: 'contact'
            },
            {
                name: 'appointmentID',
                type: 'int'
            },
            {
                name: 'isRiskDone',
                type: 'boolean'
            },
            {
                name: 'mode',
                type: 'int'
            },
            {
                defaultValue: '',
                name: 'riskSignature',
                type: 'string'
            },
            {
                defaultValue: '',
                name: 'employeeSignature',
                type: 'string'
            },
            {
                defaultValue: '',
                name: 'customerSignature',
                type: 'string'
            },
            {
                defaultValue: '',
                name: 'customerName',
                type: 'string'
            },
            {
                name: 'isKM',
                type: 'boolean'
            },
            {
                name: 'kilometres',
                type: 'int'
            },
            {
                defaultValue: 0,
                name: 'isOvernight',
                type: 'boolean'
            },
            {
                defaultValue: 0,
                name: 'inventoryBatch',
                type: 'int'
            },
            {
                defaultValue: 0,
                name: 'appointmentBatch',
                type: 'int'
            },
            {
                defaultValue: 0,
                name: 'contractorBatch',
                type: 'int'
            },
            {
                defaultValue: 0,
                name: 'riskRABatch',
                type: 'int'
            },
            {
                defaultValue: 0,
                name: 'riskTasksBatch',
                type: 'int'
            },
            {
                defaultValue: 0,
                name: 'attachmentBatch',
                type: 'int'
            }
        ]
    }
});