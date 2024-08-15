import axios from "axios";

export const get = (url, callback) => {
    const config = {
        url
    };
    axios.request(config).then(
        result => callback(result.data)
    );
};

export const save = (url, method, data, callback) => {
    const config = {
        url,
        data,
        method
    };
    axios.request(config).then(
        result => callback(result.data)
    );
};

export const remove = (url, callback) => {
    const config = {
        url,
        method: "DELETE"
    }
    axios.request(config).then(result => callback(result.data))
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
    const removeResource = (resource, callback) => {
        apiUrl += `/${resource.id}`
        remove(apiUrl, callback)
    }

    return {findAll, findOne, save: saveResource, remove: removeResource}
}
