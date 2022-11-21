import React from 'react';
import {useState, useEffect, useRef} from "react";

// let renderCountTwo = 1;   //к исправлению 1

function Ref(props) {
    // const [renderCount, setRenderCount] = useState(1)
    const [value, setValue] = useState('initial')
    let valueTest = 'test'

    /**
     * hook useRef
     * в данном случае renderCountRef не переменная, а обьект. В єтом обьекте присутствует свойство current
     */
    const renderCountRef = useRef(1);
    // console.log(renderCountRef)
    // console.log(renderCountRef.current)

    const inputRef = useRef(null)   //референция; в данном случае inputRef - так же обьект со свойством current

    const prevValue = useRef('')

    /**
     * Данній вариант візівает бесконечній зацикленній рендер
     * */
    // useEffect(() => {
    //     setRenderCount(prev => prev + 1)
    // })

    /**
     * Исправление:
     * 1) создание переменной вне компонента
     * увеличение ее через useEffect
     *
     * но такой вариант не является хорошей практикой
     * */
    // useEffect(() => {
    //     renderCountTwo++
    // })
    // let changeCount = (e) => {
    //     setValue(e.target.value)
    //     console.log('changed')
    // }


    /**
     * Исправление:
     * 2) Использование хука useRef
     * он так же создает состояние
     *
     * в данном варианте у нас нет бесконечніх циклов
     * те состояния, которіе мі определяем через useRef, сохраняются между рендерами компонента,
     * но при єтом при изменении референции мі не візіваем рендер компонента
     *
     * */
    useEffect(() => {
        renderCountRef.current++
        // console.log(inputRef)
        // console.log(inputRef.current)
        // console.log(inputRef.current.value)
    })


    /**
     * Используем useRef когда нужно сохранить состояние между рендерами, и при єтом компоненту не нужно перерисовівать,
     * т.е. сам рендер візівать не нужно
     *
     * Использование useRef - получение ссілок на какие-то ДОМ-єлементі
     * часто используются чтоб задавать фокусі на єлементі
     * */
    const focus = () => inputRef.current.focus()

    /**
     * Используем useRef когда нужно получить предідущее состояние
     *
     * */
    useEffect(() => {
        prevValue.current = value
    }, [value])


    return (
        <div>
            <h1>Counts of render: {renderCountRef.current}</h1>
            <h2>Previous value: {prevValue.current}</h2>
            <div>
                <input ref={inputRef} type="text" onChange={(e) => {
                    setValue(e.target.value)
                }} value={value}/>
            </div>
            <div>
                <button onClick={focus}>
                    Focus
                </button>
            </div>
        </div>
    );
}

export default Ref;