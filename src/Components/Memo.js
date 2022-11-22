import React from 'react';
import {useState, useEffect, useRef, useMemo} from "react";

/**
 * useMemo позволяет оптимизировать приложение
 *
 * он кеширует значение, и не візівает заново функцию если при рендере значение не поменялось
 * */

//функция которая тормозит приложение длинніми вічислениями
function complexCompute (num) {
    let i = 0;
    while (i < 1000000000) i++
    return num * 2
}

function Memo(props) {
    const [number, setNumber] = useState(42)
    const [colored, setColored] = useState(false)

    // const computed = complexCompute(number)
    /**
     * useMemo принимает колбек, которій возвращает необходиміе вічисления
     * в зависимостях указівается, от чего колбек зависит
     * т.е. при изменении каких параметров необходимо снова вернуться к візову функции, а не использовать кеш
     * */
    const computed = useMemo(() => {
        return complexCompute(number)
    }, [number])

    //первоначальній вариант, без оптимизации
    // const styles = {
    //     color: colored ? 'green' : 'black'
    // }

    /**
     * useMemo может использоваться при работе с обьектами
     * данній код может сработать и при изменении числа, а не стиля
     *
     * Причина в том, что обьект - ссілочній тип данніх,
     * т.е. при рендере ссілка на обьект обновляется, и для системі зависимость "styles" обновляется.
     * Поєтому візівается данная функция
     * */
    // useEffect(() => {
    //     console.log('Style changed')
    // }, [styles])

    /**
     * чтоб избавиться от єтого, оптимизировать, меняем запись обьекта стилей
     * */
    const styles = useMemo(() => ({
        color: colored ? 'green' : 'black'
    }), [colored])

    // useEffect(() => {
    //     console.log('Style changed')
    // }, [styles])

    return (
        <div>
            <h1 style={styles}>Number - {computed}</h1>
            <div>
                <button onClick={() => {setNumber(prev => prev + 1)}}>+</button>
                <button onClick={() => {setNumber(prev => prev - 1)}}>-</button>
            </div>

            {/*без useMemo при изменении цвета перерисовівается вся компонента и заново вічисляются данніе
            что приводит к задержке*/}
            <div>
                <button onClick={() => {setColored(prev => !prev)}}>Change color</button>
            </div>
        </div>
    );
}

export default Memo;


/**
 * постоянно использовать useMemo не стоит, поскольку єто такая же функция, которая требует н-ное количество ресурсов
 * */