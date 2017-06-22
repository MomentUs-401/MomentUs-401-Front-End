'use strict';

// require('./_upload-pic.scss');

module.exports = {
  template: require('./upload-pic.html'),
  controllerAs: 'uploadPicCtrl',
  controller: [
    '$log', '$q', '$http', 'Upload', 'authService',
    function($log, $q, $http, Upload, authService) {
      this.$onInit = () => {
        $log.debug('uploadPicCtrl');

        this.pic = {};

        return authService.getToken()
        .then(token => {
          let url = `${__API_URL__}/api/memory`;

          let headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          };

          return Upload.upload({
            url,
            headers,
            method: 'POST',
          });
        })
        .then(
          res => {
            this.memory.photo = res.data;
            return res.data;
          },
          err => {
            $log.error(err.message);
            $q.reject(err);
          }
        );
      };
    },
  ],
};
