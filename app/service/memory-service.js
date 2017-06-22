'use strict';

module.exports = [
  '$q',
  '$log',
  '$http',
  'authService',
  'Upload',
  function($q, $log, $http, authService, Upload) {
    $log.debug('Memory Service');

    let service = {};

    service.memories = [];
    service.allMemories = [];

    service.createMemory = (memory) => {
      $log.debug('service.createMemory');

      return authService.getToken()
        .then(token => {
          let url = `${__API_URL__}/api/memory`;
          let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          };

          return Upload.upload({
            url,
            headers,
            method: 'POST',
            data: memory,
          });

        })
        .then(res => {
          $log.log('Memory created successfully');
          service.memories.unshift(res.data);
          return res.data;
        })
        .catch(err => {
          $log.error(err.message);
          return $q.reject(err);
        });
    };

    service.fetchMemories = () => {
      $log.debug('service.fetchMemories');

      return authService.getToken()
        .then(token => {
          let config = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };

          return $http.get(`${__API_URL__}/api/memory`, config);
        })
        .then(res => {
          $log.log('Memories retrieved');
          service.memories = res.data;
          return res.data;
        })
        .catch(err => {
          $log.error(err.message);
          $q.reject(err);
        });
    };

    service.fetchAllMemories = () => {
      $log.debug('service.fetchAllMemories');

      return authService.getToken()
        .then(token => {
          let config = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };

          return $http.get(`${__API_URL__}/api/map`, config);
        })
        .then(res => {
          $log.log('All Memories retrieved');
          service.allMemories = res.data;
          return res.data;
        })
        .catch(err => {
          $log.error(err.message);
          $q.reject(err);
        });
    };

    service.updateMemory = (memory, memoryId) => {
      $log.debug('service.updateMemory');

      return authService.getToken()

        .then(token => {
          let url = `${__API_URL__}/api/memory/${memoryId}`;

          let headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          };

          return Upload.upload({
            url,
            headers,
            method: 'PUT',
            data: memory,
          });
        })
        .then(res => {
          service.memories.forEach((ele, idx) => {
            if(ele._id === res.data._id) service.memories[idx] = res.data;
          });
          return res.data;
        })
        .catch(err => {
          $log.error(err.message);
          return $q.reject(err);
        });
    };

    service.deleteMemory = (memoryId) => {
      $log.debug('service.deleteMemory');

      return authService.getToken()
        .then(token => {
          let url = `${__API_URL__}/api/memory/${memoryId}`;

          let config = {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          return $http.delete(url, config);
        })
        .then(
          res => {
            service.memories.filter((ele, idx) => {
              if(ele._id === memoryId) {
                service.memories.splice(idx, 1);
              }
            });

            return res.data;
          },
          err => {
            $log.error(err.message);
            return $q.reject(err);
          }
        );
    };

    return service;
  },
];
