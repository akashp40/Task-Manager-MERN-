import { API_URL } from "./Utils"

//passing from client to server
export const CreateTask = async (taskObj) => {
    const url = `${API_URL}/tasks`;
    //console.log('url ', url)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    try {
        const result = await fetch(url, options);
        //fetch : the URL of the resource you want to retrieve and an optional configuration object
        const data = await result.json();
        return data;
    } 
    catch (err) {
        return err;
    }
}

export const getAllTasks = async () => {
    const url = `${API_URL}`;
    //console.log('url ', url)
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    };
    try {
        const result = await fetch(url, options);
        //fetch : the URL of the resource you want to retrieve and an optional configuration object
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const deleteTaskById = async (id) => {
    const url = `${API_URL}/${id}`;
    //console.log('url ', url)
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    };
    try {
        const result = await fetch(url, options);
        //fetch : the URL of the resource you want to retrieve and an optional configuration object
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}

export const updateTaskById = async (id,reqBody) => {
    const url = `${API_URL}/${id}`;
    //console.log('url ', url)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
    };
    try {
        const result = await fetch(url, options);
        //fetch : the URL of the resource you want to retrieve and an optional configuration object
        const data = await result.json();
        return data;
    } catch (err) {
        return err;
    }
}