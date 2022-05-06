import {auth} from "middlewares/authPage"
import Router from "next/router"

export async function getServerSideProps(ctx) {
	const {token} = await auth(ctx)
	const {id} = ctx.query

	const req = await fetch(`http://localhost:3000/api/posts/detail/${id}`, {
		headers: {
			"Authorization": `Bearer ${token}`
		},
		method: "GET"
	})

	const {post} = await req.json()

	return {
		props: {
			post
		}
	}

}

export default function PostDetail({post}) {
	return (
		<div className="container mx-auto p-4">
			<div className="py-1 rounded-md hover:bg-blue-700 px-3 text-sm inline-block font-medium mt-2 bg-blue-600 text-white"
				onClick={() => Router.push(`/posts`)}
			>
				Back To  Post
			</div>

			<div className="mt-4">
				<h1 className="text-xl font-bold text-gray-700">{post.title}</h1>
				<p className="font-medium text-gray-400">2 Minutes Ago</p>
			</div>

			<div className="mt-4">
				<p className="text-gray-600">{post.content}</p>
			</div>

		</div>
	)
}
