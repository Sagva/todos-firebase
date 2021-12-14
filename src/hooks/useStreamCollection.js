import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = (name) => {
	const [collectionData, setCollectionData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		
		//get reference to collection todos
		const ref = collection(db, name);

		// const snapshot = await getDocs(ref);
		const queryRef = query(ref, orderBy("addedTime"));

		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(), //title, complited
				};
			});
			// .sort(
			// 	(a, b) => a.addedTime?.valueOf() - b.addedTime?.valueOf()
			// );

			setCollectionData(data), setLoading(false);
		});

		return unsubscribe;
	}, []);

	return {
		loading,
		collectionData,
	};
};

export default useStreamCollection;
