/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

var App = require('app');

App.socketEventsMapper = App.QuickDataMapper.create({

  /**
   * @param {object} event
   */
  applyAlertDefinitionSummaryEvents: function(event) {
    const data = {
      alerts_summary_grouped: []
    };
    for (let name in event.summaries) {
      data.alerts_summary_grouped.push(event.summaries[name]);
    }
    App.alertDefinitionSummaryMapper.map(data);
  },

  /**
   * @param {object} event
   */
  applyHostComponentStatusEvents: function (event) {
    const hostComponent = App.HostComponent.find(event.componentName + '_' + event.hostName);
    if (hostComponent.get('isLoaded')) {
      hostComponent.set('workStatus', event.currentState);
    }
  }
});
