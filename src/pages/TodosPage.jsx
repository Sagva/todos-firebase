import React, { useEffect, useState } from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import useGetCollection from "../hooks/useGetCollection";
import { useForm } from "react-hook-form";
// import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const TodosPage = () => {
	// const {todos, loading} = useGetToods()
	const { collectionData, loading, getData } = useGetCollection("todos");

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
		// e.prerventDefault();
		console.log({ data });
		console.log({ e });
		setTitle(data.title);
		const docRef = await addDoc(collection(db, "todos"), {
			title: data.title,
			completed: false,
		});

		console.log("Document written with ID: ", docRef.id);
		getData();
		setTitle("");
		reset();
	};

	return (
		<Container className="py-3">
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1>Todos</h1>
				<Button
					onClick={() => {
						getData();
					}}
				>
					Refresh
				</Button>
			</div>

			{loading && <p>Loading...</p>}

			{collectionData && (
				<ListGroup>
					{collectionData.map((todo, index) => (
						<ListGroup.Item
							action
							href={`/todos/${todo.id}`}
							key={index}
						>
							{todo.title}
						</ListGroup.Item>
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
