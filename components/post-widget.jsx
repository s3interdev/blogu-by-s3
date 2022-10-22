import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { getRecentPosts, getSimilarPosts } from '../services/index';

const PostWidget = ({ categories, slug }) => {
	const [relatedPosts, setRelatedPosts] = useState([]);

	useEffect(() => {
		if (slug) {
			getSimilarPosts(categories, slug).then((result) => setRelatedPosts(result));
		} else {
			getRecentPosts().then((result) => setRelatedPosts(result));
		}
	}, [categories, slug]);

	return (
		<div className="mb-8 rounded-lg bg-white p-8 pb-12 shadow-lg">
			<h3 className="mb-8 border-b pb-4 text-xl font-semibold">
				{slug ? 'Related Posts' : 'Recent Posts'}
			</h3>

			{relatedPosts.map((post, index) => (
				<div key={index} className="mb-4 flex w-full items-center">
					<div className="w-16 flex-none">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={post.featuredImage.url}
							alt={post.title}
							className="h-[60px] w-[60px] rounded-lg align-middle"
						/>
					</div>

					<div className="ml-4 flex-grow">
						<p className="font-xs font-semibold text-gray-800">
							{format(parseISO(post.createdAt), 'MMMM do, yyyy')}
						</p>
						<Link
							key={index}
							href={`/post/${post.slug}`}
							className="text-md cursor-pointer transition duration-500 hover:text-sky-500"
						>
							{post.title}
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default PostWidget;
