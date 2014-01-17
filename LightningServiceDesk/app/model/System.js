/*
 * File: app/model/System.js
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

Ext.define('Mob2.model.System', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'IsTSUser',
                type: 'boolean'
            },
            {
                name: 'IsSDUser',
                type: 'boolean'
            },
            {
                name: 'BusinessDays',
                type: 'string'
            },
            {
                name: 'TimeEnd',
                type: 'date'
            },
            {
                name: 'TimeStart',
                type: 'date'
            },
            {
                name: 'TimeInterval',
                type: 'int'
            },
            {
                name: 'SD_RARRequired',
                type: 'boolean'
            },
            {
                name: 'SD_CompleteRequired',
                type: 'boolean'
            },
            {
                name: 'SD_IsInventorySynched',
                type: 'boolean'
            },
            {
                name: 'TS_StartOfWeek',
                type: 'int'
            },
            {
                name: 'TS_SDComplete',
                type: 'boolean'
            },
            {
                name: 'TS_HoursPerDay',
                type: 'float'
            },
            {
                name: 'TS_HasProjects',
                type: 'boolean'
            },
            {
                name: 'TS_ProjectEnforce',
                type: 'boolean'
            },
            {
                name: 'TS_HasLeave',
                type: 'boolean'
            },
            {
                name: 'TS_TSType',
                type: 'int'
            }
        ]
    }
});