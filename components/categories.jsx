import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCategories } from '../services';

const Categories = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getCategories().then((newCategories) => {
			setCategories(newCategories);
		});
	}, []);

	return (
		<div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
			<h3 className="mb-8 border-b pb-4 text-xl font-semibold">Categories</h3>

			{categories.map((category, index) => (
				<Link key={index} href={`/category/${category.slug}`}>
					<span
						className={`block cursor-pointer ${
							index === categories.length - 1 ? 'border-b-0' : 'border-b'
						} mb-3 pb-3 transition duration-500 hover:text-sky-500`}
					>
						{category.name}
					</span>
				</Link>
			))}
		</div>
	);
};

export default Categories;
