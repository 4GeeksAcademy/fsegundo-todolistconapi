import { useState, useEffect } from "react";

export const Todolist = () => {
    const [tareas, setTareas] = useState([]);
    const [input, setInput] = useState("");

  

    const getTareasFromApi = () => {
        fetch('https://playground.4geeks.com/todo/users/ironman')
            .then(response => {
                if (response.status === 404) {
                    return createAIronmanInApi();
                }
                return response.json();
            })
            .then(data => {
                if (data) setTareas(data);
            })
            .catch(error => console.error("Error al obtener tareas:", error));
    };

    const createAIronmanInApi = () => {
        return fetch('https://playground.4geeks.com/todos/users/ironman', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([])
        }).then(() => getTareasFromApi());
    };

    const agregarTareaAIronmanInApi = () => {
        if (input.trim() === "") return;

        const nuevasTareas = [...tareas, { label: input, done: false }];
        fetch('https://playground.4geeks.com/todos/', {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(nuevasTareas)
        })
            .then(() => {
                setInput("");
                getTareasFromApi();
            })
            .catch(error => console.error("Error al agregar tarea:", error));
    };

    const eliminarTarea = (index) => {
        const nuevasTareas = tareas.filter((_, i) => i !== index);
        fetch('https://playground.4geeks.com/todos/', {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(nuevasTareas)
        })
            .then(() => getTareasFromApi())
            .catch(error => console.error("Error al eliminar tarea:", error));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            agregarTareaAIronmanInApi();
        }
    };

    useEffect(() => {
        getTareasFromApi();
    }, []);

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
};
