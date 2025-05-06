import { useState, useEffect } from "react";



export const Todolist = () => {

    const [tareas, setTareas] = useState([]);
    const [input, setInput] = useState("");

    const API = "https://playground.4geeks.com/todos/user/ironman";


    const getTareasFromApi = async () => {
        const response = await fetch(API);
        if (response.status === 404) {
            await createAIronmanInApi();
            return;
        }

        const data = await response.json();
        setTareas(data);
    };

    const createAIronmanInApi = async () => {
        await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        });
        getTareasFromApi();
    };

    const agregarTareaAIronmanInApi = async () => {
        if (input.trim() === "") return;

        const nuevasTareas = [...tareas, { label: input, done: false }];
        await fetch(API, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(nuevasTareas)
        });
        setInput("");
        getTareasFromApi();
    }

    const eliminarTarea = async (index) => {
        const nuevasTareas = tareas.filter((_, i) => i !== index);
        await fetch(API, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(nuevasTareas)
        });
        getTareasFromApi();

    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            agregarTareaAIronmanInApi();
        }
    };

    useEffect(() => {
        getTareasFromApi();

    },
        []);



    return (
        <div className="text-center">

            <h1>TAREAS DE SEGUNDO</h1>
            <input
                value={input}
                type="text"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribir tarea"
            />

            {tareas.map((tarea, index) => (
                <div key={index}>
                    <span>{tarea.label}</span>{" "}
                    <button onClick={() => eliminarTarea(index)}>x</button>
                </div>
            ))}
        </div>
    );

}