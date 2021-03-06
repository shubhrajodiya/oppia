// Copyright 2014 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Directive for the Continue button interaction.
 *
 * IMPORTANT NOTE: The naming convention for customization args that are passed
 * into the directive is: the name of the parameter, followed by 'With',
 * followed by the name of the arg.
 */
oppia.directive('oppiaInteractiveContinue', [
  'HtmlEscaperService', 'continueRulesService', 'UrlInterpolationService',
  function(HtmlEscaperService, continueRulesService, UrlInterpolationService) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      templateUrl: UrlInterpolationService.getExtensionResourceUrl(
        '/interactions/Continue/directives/' +
        'continue_interaction_directive.html'),
      controller: [
        '$scope', '$attrs', 'WindowDimensionsService',
        'EVENT_PROGRESS_NAV_SUBMITTED',
        function(
            $scope, $attrs, WindowDimensionsService,
            EVENT_PROGRESS_NAV_SUBMITTED) {
          $scope.buttonText = HtmlEscaperService.escapedJsonToObj(
            $attrs.buttonTextWithValue);

          var DEFAULT_BUTTON_TEXT = 'Continue';
          var DEFAULT_HUMAN_READABLE_ANSWER = 'Please continue.';

          $scope.submitAnswer = function() {
            // We used to show "(Continue)" to indicate a 'continue' action when
            // the learner browses through the history of the exploration, but
            // this apparently can be mistaken for a button/control. The
            // following makes the learner's "answer" a bit more conversational,
            // as if they were chatting with Oppia.
            var humanReadableAnswer = DEFAULT_HUMAN_READABLE_ANSWER;
            if ($scope.buttonText !== DEFAULT_BUTTON_TEXT) {
              humanReadableAnswer = $scope.buttonText;
            }

            $scope.onSubmit({
              answer: humanReadableAnswer,
              rulesService: continueRulesService
            });
          };

          $scope.$on(EVENT_PROGRESS_NAV_SUBMITTED, $scope.submitAnswer);
        }
      ]
    };
  }
]);

oppia.directive('oppiaResponseContinue', [
  'UrlInterpolationService', function(UrlInterpolationService) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: UrlInterpolationService.getExtensionResourceUrl(
        '/interactions/Continue/directives/' +
        'continue_response_directive.html'),
      controller: [
        '$scope', '$attrs', 'HtmlEscaperService',
        function($scope, $attrs, HtmlEscaperService) {
          $scope.answer = HtmlEscaperService.escapedJsonToObj($attrs.answer);
        }
      ]
    };
  }
]);

oppia.directive('oppiaShortResponseContinue', [
  'UrlInterpolationService', function(UrlInterpolationService) {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: UrlInterpolationService.getExtensionResourceUrl(
        '/interactions/Continue/directives/' +
        'continue_short_response_directive.html'),
      controller: [
        '$scope', '$attrs', 'HtmlEscaperService',
        function($scope, $attrs, HtmlEscaperService) {
          $scope.answer = HtmlEscaperService.escapedJsonToObj($attrs.answer);
        }
      ]
    };
  }
]);

oppia.factory('continueRulesService', [function() {
  return {};
}]);
