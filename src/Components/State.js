import React, {useState} from 'react';

function State(props) {
    const [count, setCount] = useState(5);

    /**
     state в виде об'єкта в функциональной компоненте: изменение одного поля - обновление всего state.
     То что не біло указано для изменения, просто пропадет
     */
    const [state, setState] = useState({
        title: 'First',
        date: Date.now()
    })

    function increment() {
        // setCount(count + 1)
        //best practice - использование колбека которій берет за основу предідущее значение prevCount
        //тогда можно точно основіваться на том состоянии, которое біло до єтого, без перезагрузки стейта

        setCount((prev) => prev + 1)
    }

    function decrement() {
        setCount(count - 1)
    }

    function updateTitle() {
        setState(prev => {
            return {
                ...prev,
                title: 'Second'
            }
        })
    }

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>

            <div>
                <button onClick={updateTitle}>New title</button>
                <pre>
                    {JSON.stringify(state, null, 2)}
                </pre>
            </div>
        </div>
    );
}

export default State;

