import axios from "axios";

export const get = (url, callback, params) => {
    const config = {
        url,
        params
    };
    axios.request(config).then(
        result => callback(result.data)
    );
};

export const save = (url, method, data, callback = () => null) => {
    const config = {
        url,
        data,
        method
    };
    axios.request(config).then(
        result => callback(result.data)
    );
};

export const remove = (url, callback, onError) => {
    const config = {
        url,
        method: "DELETE"
    }
    axios.request(config).then(result => callback(result.data)).catch(e => {
        if (onError) {
            onError(e);
        } else {
            throw e;
        }
    })
}

export const buildActions = (resourceName, url) => {
    let apiUrl = url || resourceName + "s"
    const findAll = (callback) => {
        get(apiUrl, callback)
    }

    const findOne = (id, callback) => {
        get(`${apiUrl}/${id}`, callback)
    }

    const saveResource = (resource, callback) => {
        let method = "POST"
        if (resource.id) {
            apiUrl += `/${resource.id}`
            method = "PUT"
        }
        save(apiUrl, method, {[resourceName]: resource}, callback)
    }
    const removeResource = (resource, callback, onError) => {
        apiUrl += `/${resource.id}`
        remove(apiUrl, callback, onError)
    }

    return {findAll, findOne, save: saveResource, remove: removeResource}
}
