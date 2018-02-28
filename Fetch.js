(function(global) {
    function Fetch() {}
    /**
     * 跨域fetch GET
     * @param {string} url 纯url，不带参数
     * @param {success} 为成功回调
     */
    Fetch.prototype.fetch = function ({ url, success }) {
        let token = this.getSessionStorate('token');
        let headers = new Headers();
        headers.append('access_token', token);
        let request = new Request(url, {
            headers: headers,
            method: "GET"
        });
        fetch(request).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }
            response.json().then((res) => {
                success(res);
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    /**
     * 跨域fetch POST
     * @param {string} data 序列化过的对象
     * @param {string} url 纯url，不带参数
     * @param {success} 为成功回调
     */
    Fetch.prototype.fetch_Post = function ({ url, data, success }) {
        let token = this.getSessionStorate('token');
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append('access_token', token);
        let request = new Request(url, {
            headers: headers,
            method: "POST",
            body: data,
        });
        fetch(request).then((response) => {
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }
            let headers = response.headers;
            response.json().then((res) => {
                success(res, headers);
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    /**
     * 异步fetch POST
     * @param {string} data 序列化过的对象
     * @param {string} url 纯url，不带参数
     */
    Fetch.prototype.fetchAsync_Get = function ({ url, data }) {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: data
            }).then((response) => {
                if (response.status !== 200) {
                    throw new Error('Fail to get response with status ' + response.status);
                }
                response.json().then((res) => {
                    res = JSON.parse(res);
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * 异步fetch GET
     * @param {string} url url，带参数
     */
    Fetch.prototype.fetchAsync_Get = function (url) {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => {
                if (response.status !== 200) {
                    throw new Error('Fail to get response with status ' + response.status);
                }
                response.json().then((res) => {
                    res = JSON.parse(res);
                    resolve(res);
                }).catch((error) => {
                    reject(error);
                });
            }).catch((error) => {
                reject(error);
            });
        });
    }
    global.myFetch = new Fetch();
})(window)
