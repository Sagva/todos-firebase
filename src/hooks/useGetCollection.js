import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const useGetCollection = (name) => {
	const [collectionData, setCollectionData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		setLoading(true);
		//get reference to collection todos
		const ref = collection(db, name);

		const snapshot = await getDocs(ref);

		const data = snapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(), //title, complited
			};
		});
		// console.log(`data`,data)
		setCollectionData(data), setLoading(false);
	};

	return {
		loading,
		collectionData,
		getData,
	};
};

export default useGetCollection;
