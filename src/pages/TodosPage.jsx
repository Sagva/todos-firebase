import React, { useEffect, useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import useGetCollection from "../hooks/useGetCollection";
import { useForm } from "react-hook-form";
// import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
	collection,
	addDoc,
	serverTimestamp,
	doc,
	deleteDoc,
} from "firebase/firestore";
import useStreamCollection from "../hooks/useStreamCollection";

const TodosPage = () => {
	// const {todos, loading} = useGetToods()
	// const { collectionData, loading, getData } = useGetCollection("todos");
	const { collectionData, loading } = useStreamCollection("todos");

	useEffect(() => {
		console.log(`collectionData`, collectionData);
	}, [collectionData]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [title, setTitle] = useState();

	const onSubmit = async (data, e) => {
		setTitle(data.title);
		const docRef = await addDoc(collection(db, "todos"), {
			title: data.title,
			completed: false,
			addedTime: serverTimestamp(),
		});

		console.log("Document written with ID: ", docRef.id);

		setTitle("");
		reset();
	};

	const deleteTodo = async (id) => {
		if (id) {
			const ref = doc(db, "todos", id);
			await deleteDoc(ref);
		}
	};

	return (
		<Container className="py-3">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1>Todos</h1>
			</div>

			{loading && <p>Loading...</p>}

			{collectionData && (
				<ListGroup>
					{collectionData.map((todo, index) => (
						<div
							style={{ display: "flex", marginBottom: 5 }}
							key={index}
						>
							<ListGroup.Item action href={`/todos/${todo.id}`}>
								{todo.title}
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
							</ListGroup.Item>
							<button
								onClick={() => deleteTodo(todo.id)}
								style={{
									height: "35px",
									borderRadius: "5px",
									backgroundColor: "LightSlateGrey",
								}}
							>
								Delete
							</button>
						</div>
					))}
				</ListGroup>
			)}

			<form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 20 }}>
				{/* register your input into the hook by invoking the "register" function */}
				<input
					defaultValue={title}
					style={{ border: "1px solid light-gray", padding: 5 }}
					{...register("title", { required: true })}
					placeholder="Enter book title"
				/>

				{/* errors will return when field validation fails  */}
				{errors.title && <span>This field is required</span>}
				<input type="submit" style={{ marginLeft: 20 }} />
			</form>
		</Container>
	);
};

export default TodosPage;
