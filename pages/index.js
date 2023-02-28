import styles from '../styles/index.module.scss';
import LichiCart from '../services/LichiCartApi.js';
import React, {useState, useEffect} from 'react';

export default function Index({message}) {
    const ids = [56082,56083,56086,56102];

    // const [reviews, setReviews] = useState([]);
    // useEffect(()=>{
    //     const getData = async () => {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    //         const data = await response.json();
    //         setReviews(data);
    //     }
    //     getData();
    // },[])
    // console.log(reviews);

    const [reviews, setReviews] = useState([]);
    useEffect(()=>{
        const getData = async () => {
            const cart = new LichiCart('https://api.lichi.com/cart');
            const listID = [56082,56083,56086,56102];
            const lang = 1;
            const shop = 1;
            
            await cart.addItem(lang, shop, listID[0]);
            await cart.addItem(lang, shop, listID[1]);
            await cart.addItem(lang, shop, listID[2]);
            await cart.addItem(lang, shop, listID[3]);
            const res = await cart.getListItems(lang, shop);
            setReviews(`В корзине ${res.api_data.iCount} товарa(ов)`);

        }
        getData();
    },[])
    console.log(reviews);

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <img className={styles.logo} src="../static/media/logo-navbar.png"></img>
            </div>
            <div className={styles.main}>
                <div className={styles.items}>
                    {ids.map(id => {
                        return(
                            <div key={id} className={styles.item}>
                                #{id}
                                <button className={styles.btn_add}>Добавить в корзину</button>
                            </div>
                            
                        )
                    })}
                </div>
                <div className={styles.cart}>
                    <div className={styles.cart_title}>Моя корзина</div>
                    {/* <p>{message}</p> */}
                </div>
            </div>

        </div>
    )
}

