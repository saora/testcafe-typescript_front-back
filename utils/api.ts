const api = HOST => {
    const supertest = require('supertest')
    const api = supertest(HOST)

    const handlerRequestErrore = (result, url, method = null, body=null) => {
        if(result.body.code < 200 || result.body.code > 299 || !result.body.code){
            throw{
                endpoint: api+url,
                method,
                body,
                result: result.body
            }
        }
    }

    const simpleRequest = async(url, header) => {
       // if(process.env.LOGGER == 'true') console.log(HOST+url)
        const result = await api['get'](url)
        .set('Barear', header.token)
        .set('Accept', 'application/json')
        handlerRequestError(result, url)
        return result.body
    }

    const getListAndTakeRandomIteme = async(url, auth) => {
       // if(process.env.LOGGER == 'true') console.log(HOST+url)
        const result = await api
        .get(url)
        .set('Barear', auth.token)
        handlerRequestError(result, url)
        const list = result.body.data
        const random = Math.floor(Math.random()*list.length+0)
        const element = list[random]
        return element
    }

    const requestWithBodye = async (url, method, header, body) => {
        const result = await api[method](url)
        .set('Barear', header.token)
        .set('Accept', 'application/json')
        .send(body)
        return result.body
    }


    const handlerRequestError = (result, url, method = null, body = null) => {
        if(result.statusCode < 200 || result.statusCode > 299 || !result.statusCode){
            throw{
                endpoint: api+url,
                method,
                body,
                result: result.body,
                statusCode: result.statusCode,
                response: result.text
            }
        }
    }
    
    const getListAndTakeRandomItem = async(url, auth) => {
        const result = await api
        .get(url)
        .set('Authorization', 'Bearer '+ auth)
        handlerRequestError(result, url)
        const list = result.body
        const random = Math.floor(Math.random()*list.length + 0)
        const element = list[random]
        return element
    }
    
    
    const requestWithBody = async (url, method, header, body) => {
        const result = await api[method](url)   
        .set('Authorization', 'Bearer '+header)
        .set('Accept', 'application/json')
        .send(body)
        handlerRequestError(result, url)
        return result.body
    }

    const requestPost = async(url, header, body) => requestWithBody(url, 'post', header, body)
    const requestGet = async(url, header, body) => requestWithBody(url, 'get', header, body)


    return {
        simpleRequest, getListAndTakeRandomItem, requestGet, requestPost, requestWithBody
    }  
    

}

export default api