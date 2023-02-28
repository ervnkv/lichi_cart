import axios from 'axios';


class LichiCart {
    constructor(baseURL) {
        // this.baseURL = baseURL;
        // this.sid = null;
        this.axios = axios.create({
            baseURL: baseURL,
            withCredentials: true, // set withCredentials to true by default
        });
    }  
    
    // Добавить товар
    async addItem(lang, shop, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.axios.post(`/add`,
                {
                    lang:lang,
                    shop:shop,
                    id:id,
                },
                // {headers: {
                //     Cookie: this.sid ?? ''
                //     }
                // },
                // {withCredentials: true}
                );
                console.log(response);
                // if (this.sid == null) {
                    
                    // this.sid = response.headers['set-cookie'][0].split(';')[0];
                // }
                if (response.data.api_data_success == true) {
                    resolve(response.data.api_data_success);
                } else {
                    reject(`Не удалось добавить товар: ${response.api_messages[0].text}`);
                }
            } catch (error) {
                console.error(error);
                reject(error);
            }
        })
    }

    // Получить список всех товаров
    async getListItems(lang, shop) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.axios.post(`/list`, 
                {
                    lang:lang,
                    shop:shop,
                }, 
                // {headers: {
                //     Cookie: this.sid ?? ''
                //     }
                // },
                // {withCredentials: true}
                );
                console.log(response);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        })
    }
    // Удалить товар
    async removeItem(lang, shop, id, all) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await this.axios.post(`/remove`, 
                {
                    lang:lang,
                    shop:shop,
                    id:id,
                    all:all,
                }, 
                {headers: {
                    Cookie: this.sid ?? ''
                    }
                },
                {withCredentials: true});
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        })
    }
}
export default LichiCart;


// Пример использования
/*
const cart = new LichiCart('https://api.lichi.com/cart');
const listID = [56082,56083,56086,56102];
const lang = 1;
const shop = 1;


await cart.addItem(lang, shop, listID[0]);
await cart.addItem(lang, shop, listID[1]);
await cart.addItem(lang, shop, listID[2]);
await cart.addItem(lang, shop, listID[3]);
await cart.addItem(lang, shop, listID[3]);

await cart.getListItems(lang, shop)
    .then((res) => console.log(`В корзине ${res.api_data.iCount} товарa(ов)`));

const deleteAllItems = true; // Если товар один, то false ничего не удалит
await cart.removeItem(lang, shop, listID[2], deleteAllItems); 


await cart.getListItems(lang, shop)
    .then((res) => console.log(`В корзине ${res.api_data.iCount} товарa(ов)`));
*/

// Поиск существующих ID
/*
for (let i = 43328; i < 100000; i++) {
    const res = await cart.addItem(1, 1, i);
    const messageText = res.api_messages[0].text;
    if (messageText != '[cart.error_no_product]') {
        console.log(`${i} - ${messageText}`)
        // break
    }
}
*/