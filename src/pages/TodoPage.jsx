import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import useGetDocument from "../hooks/useGetDocument";
// import useGetTood from '../hooks/useGetTodo'
import { db } from "../firebase";
import { doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
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
			// await updateDoc(ref, {
			// 	completed: !todo.completed,
			// });
			const updateTimestamp = await updateDoc(ref, {
				completed: !todo.completed,
				changedTime: serverTimestamp(),
			});
		}
	};
	return (
		<Container className="py-3">
			{loading && <p>Loading...</p>}
			{todo && (
				<>
					{" "}
					<div className="d-flex flex-column justify-content-between align-items-start mb-3">
						<h1>{todo.title}</h1>
						<p style={{ fontSize: 12 }}>
							Added:
							{todo.addedTime?.seconds && (
								<span className="mx-3">
									{`${new Date(
										todo.addedTime?.seconds * 1000
									)}`}
								</span>
							)}
						</p>

						<p style={{ fontSize: 12 }}>
							Changed:
							{todo.changedTime && todo.changedTime.seconds && (
								<span className="mx-3">
									{`${new Date(
										todo.changedTime?.seconds * 1000
									)}`}
								</span>
							)}
						</p>

						{todo.completed
							? `Todo is done 😊 `
							: `Todo is not done yet 😥`}
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
