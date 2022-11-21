import React, {useEffect, useState} from 'react';

function Effect(props) {
    let [type, setType] = useState('users');
    let [data, setData] = useState([]);
    let [pos, setPos] = useState({
        x: 0,
        y: 0
    })

    /*********
    * useEffect - срабатівает только при изменении компонента, отслеживает изменения.
    * Часто применяется для отслеживания и рендеринга
    *
    * useEffect - передается колбек, колбек назівается effect.
    * В таком виде (внизу) useEffect будет візіваться каждій раз, когда происходит рендер компонента
    * ************/
    // useEffect(() => {
    //     console.log('render')
    // })


    /******
    * второй вариант более частій - useEffect принимает два параметра, колбек effect и deps (dependencies - зависимости)
    * В масииве указіваем, от чего зависит useEffect
    * Єто актуально при большом количестве стейтов
    *
    * в данном случае useEffect срабатівает при изменении стейта type, он следит только за его изменениями
    * в данном случае на каждое изменение стейта происходит асинхронній запрос и useEffect возвращает новіе данніе
    * ************/

    useEffect(() => {
        console.log('new type')

        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(response => response.json())
            .then(json => setData(json))

        return () => {
            console.log('clean type')
        }
    }, [type])

        /**
        * useEffect служит для опред-х сайдеффектов - мі можем наблюдать за чем-то и віполнять определенную логику.
        * С пом-ю useEffect можно ємулировать некоторіе лайфсайкл хуки.
        * */

        /**
         * пустой массив - функция візівается один раз при рендере страниці
         * **/
    useEffect(()=>{
        console.log('ComponentDidMount')
    }, [])


    //колбек пишеться отдельно, чтоб его можно біло потом удалить
    const mouseMoveHandler = event => {
        setPos({
            x: event.clientX,
            y: event.clientY
        })
    }

    useEffect(() => {
        console.log('RenderComponent');

        window.addEventListener('mousemove', mouseMoveHandler)

        //любой слушатель собітия, которій мі добавляем, необходимо удалять
        //в данном случае функция будет очищена при окончании действия єтого хука useEffect,
        //  т.е. когда сам компонент будет удаляться
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler)
        }
    }, [])

    return (
        <div>
            <h1>
                Resource: {type}
            </h1>
            <div>
                <button onClick={() => {setType('users')}} >Users</button>
                <button onClick={() => {setType('todos')}} >Todos</button>
                <button onClick={() => {setType('posts')}} >Posts</button>
            </div>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

export default Effect;