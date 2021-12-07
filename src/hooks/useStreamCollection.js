import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const useStreamCollection = (name) => {
	const [collectionData, setCollectionData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		//get reference to collection todos
		const ref = collection(db, name);

		// const snapshot = await getDocs(ref);

		const unsubscribe = onSnapshot(ref, (snapshot) => {
			const data = snapshot.docs
				.map((doc) => {
					return {
						id: doc.id,
						...doc.data(), //title, complited
					};
				})
				.sort(
					(a, b) => a.addedTime?.valueOf() - b.addedTime?.valueOf()
				);

			// if(a.addedTime.valueOf() > b.addedTime.valueOf()) {
			//     return -1
			// }

			// console.log(`data`,data)
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
