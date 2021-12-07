import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import useGetDocument from "../hooks/useGetDocument";
// import useGetTood from '../hooks/useGetTodo'
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import useStreamDocument from "../hooks/useStreamDocument";

const TodoPage = () => {
	const { id } = useParams();
	// const {todo, loading} = useGetTood(id)
	// const { document: todo, loading, getData } = useGetDocument("todos", id);
	const { data: todo, loading } = useStreamDocument("todos", id);

	const navigate = useNavigate();

	const deleteTodo = async () => {
		if (id) {
			const ref = doc(db, "todos", id);
			await deleteDoc(ref);

			navigate("/todos", { replace: true });
		}
	};
	const toggleTodo = async () => {
		if (id) {
			const ref = doc(db, "todos", id);
			await updateDoc(ref, {
				completed: !todo.completed,
			});
			// getData("todos", id);
		}
	};
	return (
		<Container className="py-3">
			{loading && <p>Loading...</p>}
			{todo && (
				<>
					{" "}
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h1>{todo.title}</h1>

						{todo.completed
							? `todo is done 😊 `
							: `todo is not done yet 😥`}
					</div>
					<ButtonGroup className="todo-actions">
						<Button variant="primary" onClick={toggleTodo}>
							Toggle
						</Button>
						<Button variant="danger" onClick={deleteTodo}>
							Delete
						</Button>
					</ButtonGroup>
				</>
			)}
		</Container>
	);
};

export default TodoPage;
